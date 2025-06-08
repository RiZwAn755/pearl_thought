const { EmailService, MockProvider } = require('./EmailService');

const provider1 = new MockProvider("ProviderA", 0.5);
const provider2 = new MockProvider("ProviderB", 0.2);

const emailService = new EmailService([provider1, provider2]);

(async() => {
    try {
        const result = await emailService.sendEmail("email-123", "test@example.com", "Hello from EmailService!");
        console.log("Send result:", result);
    } catch (err) {
        console.error("Failed to send email:", err.message);
    }

    console.log("Status:", emailService.getStatus("email-123"));
})();