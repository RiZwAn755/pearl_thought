#Pearl_Thoughts Task

A reliable email service built with JavaScript that works like real-world systems. It includes features like retrying failed attempts, switching to backup providers, and stopping repeated failures. It uses fake email providers for testing instead of real ones

---

##  Features

* Retry with Exponential Backoff
*  Fallback Between Providers
*  Circuit Breaker Per Provider
*  Idempotency via `emailId`
*  Basic Rate Limiting (5 emails/sec)
*  Status Tracking (`SENT`, `FAILED`, `UNKNOWN`)
*  Simple Logging
*  Mock Providers (for simulation)

---

##  Setup Instructions

### 1. Clone or Create Project Folder

```bash
mkdir pearl_task && cd pearl_task
code .  # Open this Code in vs code
```

### 2. Initialize Node Project

```bash
npm init -y
```

### 3. Install  Dependencies

```bash
npm install --save-dev jest
```

### 4. Add Files

* `EmailService.js`: Contains the main service and supporting classes
* `index.js`: Sample usage for manual testing
* `EmailService.test.js`: Unit tests

### 5. Update package.json for Testing

```json
"scripts": {
  "test": "jest"
}
```

### 6. start the project

```bash
node index.js
```

### 7. Run the Tests

```bash
npm test
```

---

## File Structure of this project

```
pearl_task/
├── EmailService.js         # Main email service logic
├── index.js                # Example usage
├── EmailService.test.js    # Unit tests
└── package.json            # NPM config
```

---

##  Assumptions that I made

* Two mock providers simulate success/failure (e.g., ProviderA with 50% fail rate).
* Idempotency is stored in memory (using a `Set`). In production, a persistent store like Redis would be used.
* Rate limiting is fixed to 5 emails per second.
* Circuit breaker opens after 3 consecutive failures and resets after 10 seconds.

---

## working

1. Call `sendEmail(emailId, to, content)`
2. It tries provider 1 with retries (with exponential backoff)
3. If it fails, it falls back to provider 2
4. Prevents re-sending same email (idempotent)
5. If rate limit exceeded, the request is queued
6. Tracks and logs status of every attempt

---

##  Example Output

```
[EmailService] 2025-06-08T02:29:07.068Z: Provider ProviderA failed: ProviderA failed to send email.
[EmailService] 2025-06-08T02:29:07.581Z: ProviderB sent email to test@example.com
Send result: ProviderB sent email to test@example.com
Status: SENT
```

---


Created by- 
Mohammad Rizwan :)

---


