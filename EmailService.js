class MockProvider {
    constructor(name, failRate = 0.3) {
        this.name = name;
        this.failRate = failRate;
        this.sentEmails = new Set();
    }

    async send(emailId, to, content) {
        if (Math.random() < this.failRate) {
            throw new Error(`${this.name} failed to send email.`);
        }
        this.sentEmails.add(emailId);
        return `${this.name} sent email to ${to}`;
    }
}

class RateLimiter {
    constructor(limit, intervalMs) {
        this.limit = limit;
        this.interval = intervalMs;
        this.tokens = limit;
        this.queue = [];

        setInterval(() => {
            this.tokens = this.limit;
            this.processQueue();
        }, this.interval);
    }

    processQueue() {
        while (this.tokens > 0 && this.queue.length > 0) {
            const next = this.queue.shift();
            this.tokens--;
            next();
        }
    }

    schedule(fn) {
        return new Promise((resolve, reject) => {
            const execute = async() => {
                try {
                    const result = await fn();
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            };

            if (this.tokens > 0) {
                this.tokens--;
                execute();
            } else {
                this.queue.push(execute);
            }
        });
    }
}

class CircuitBreaker {
    constructor(failureThreshold = 3, resetTimeout = 10000) {
        this.failureCount = 0;
        this.failureThreshold = failureThreshold;
        this.state = 'CLOSED';
        this.resetTimeout = resetTimeout;
        this.lastFailureTime = null;
    }

    async exec(fn) {
        if (this.state === 'OPEN') {
            const now = Date.now();
            if (now - this.lastFailureTime > this.resetTimeout) {
                this.state = 'HALF';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }

        try {
            const result = await fn();
            this.failureCount = 0;
            this.state = 'CLOSED';
            return result;
        } catch (err) {
            this.failureCount++;
            if (this.failureCount >= this.failureThreshold) {
                this.state = 'OPEN';
                this.lastFailureTime = Date.now();
            }
            throw err;
        }
    }
}

class EmailService {
    constructor(providers) {
        this.providers = providers;
        this.sentEmails = new Set();
        this.rateLimiter = new RateLimiter(5, 1000); // 5 emails/sec
        this.circuitBreakers = providers.map(() => new CircuitBreaker());
        this.statusMap = new Map();
    }

    async sendEmail(emailId, to, content) {
        if (this.sentEmails.has(emailId)) {
            this.log(`Skipping duplicate email ID: ${emailId}`);
            return 'Duplicate email';
        }

        for (let i = 0; i < this.providers.length; i++) {
            const provider = this.providers[i];
            const breaker = this.circuitBreakers[i];

            try {
                const result = await this.rateLimiter.schedule(() =>
                    breaker.exec(() =>
                        this.retryWithBackoff(() => provider.send(emailId, to, content))
                    )
                );
                this.sentEmails.add(emailId);
                this.statusMap.set(emailId, 'SENT');
                this.log(result);
                return result;
            } catch (err) {
                this.statusMap.set(emailId, 'FAILED');
                this.log(`Provider ${provider.name} failed: ${err.message}`);
            }
        }

        throw new Error('All providers failed. Email not sent.');
    }

    async retryWithBackoff(fn, retries = 3, delay = 500) {
        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                return await fn();
            } catch (err) {
                if (attempt === retries - 1) throw err;
                await new Promise(res => setTimeout(res, delay * Math.pow(2, attempt)));
            }
        }
    }

    getStatus(emailId) {
        return this.statusMap.get(emailId) || 'UNKNOWN';
    }

    log(message) {
        console.log(`[EmailService] ${new Date().toISOString()}: ${message}`);
    }
}

module.exports = { EmailService, MockProvider };