This project simulates a fault-tolerant email service using JavaScript, incorporating several production-grade patterns such as retry mechanisms, fallback logic, circuit breakers, and rate limiting. It uses mock email providers for simulation purposes—ideal for learning and testing without relying on external APIs.

Features
The system is designed to handle failures gracefully and includes the following capabilities:

Retry logic with exponential backoff

Provider fallback in case of repeated failures

Circuit breaker per provider with automatic reset

Idempotency support using a unique emailId

Basic rate limiting (maximum 5 emails per second)

Status tracking for email operations (SENT, FAILED, UNKNOWN)

In-memory logging for visibility into operations

Mock email providers to simulate real-world failure/success scenarios

Getting Started
Follow the steps below to set up and run the project:

Step 1: Create Project Directory
bash
Copy
Edit
mkdir resilient-email-service
cd resilient-email-service
code .
Step 2: Initialize Node.js Project
bash
Copy
Edit
npm init -y
Step 3: Install Testing Library
bash
Copy
Edit
npm install --save-dev jest
Step 4: Add Source Files
Create the following files in your project directory:

EmailService.js: Core logic of the email service

index.js: Example usage for manual testing

EmailService.test.js: Unit tests

Step 5: Update Package Scripts
In your package.json, add the test script:

json
Copy
Edit
"scripts": {
  "test": "jest"
}
Step 6: Run the Application
bash
Copy
Edit
node index.js
Step 7: Execute Unit Tests
bash
Copy
Edit
npm test
Project Structure
bash
Copy
Edit
resilient-email-service/
├── EmailService.js         # Main email service implementation
├── index.js                # Entry point and example execution
├── EmailService.test.js    # Jest test suite
└── package.json            # Project configuration
Design Assumptions
The service uses two mock providers. One of them (e.g., ProviderA) simulates a 50% failure rate.

Idempotency is managed in-memory using a Set. In real-world scenarios, you’d likely use Redis or another persistent store.

The rate limiter allows up to 5 emails per second.

Each provider has a circuit breaker that opens after 3 consecutive failures and resets after 10 seconds.

Workflow Summary
sendEmail(emailId, to, content) is called.

The first provider attempts to send the email with retry logic using exponential backoff.

If it fails, the system automatically falls back to the second provider.

Duplicate email attempts are avoided using emailId (idempotency).

Rate limits are enforced, and excess requests are queued.

The result of each attempt is logged and tracked.

Example Output
vbnet
Copy
Edit
[EmailService] 2025-06-08T02:29:07.068Z: Provider ProviderA failed: ProviderA failed to send email.
[EmailService] 2025-06-08T02:29:07.581Z: ProviderB sent email to test@example.com
Send result: ProviderB sent email to test@example.com
Status: SENT
Author
Mohammad Rizwan

For feedback or collaboration, feel free to reach out via GitHub or LinkedIn.
