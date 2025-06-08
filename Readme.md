
#Pearl_Thoughts Task

A reliable email service built with JavaScript that works like real-world systems. It includes features like retrying failed attempts, switching to backup providers, and stopping repeated failures. It uses fake email providers for testing instead of real ones

Retry logic with exponential backoff

##  Features

* Retry with Exponential Backoff
*  Fallback Between Providers
*  Circuit Breaker Per Provider
*  Idempotency via `emailId`
*  Basic Rate Limiting (5 emails/sec)
*  Status Tracking (`SENT`, `FAILED`, `UNKNOWN`)
*  Simple Logging
*  Mock Providers (for simulation)



Idempotency support using a unique emailId


##  Setup Instructions


Status tracking for email operations (SENT, FAILED, UNKNOWN)

```bash
mkdir pearl_task && cd pearl_task
code .  # Open this Code in vs code
```

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

```

### 3. Install  Dependencies

```bash
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

```

### 6. start the project

```bash

node index.js
Step 7: Execute Unit Tests
bash
Copy
Edit
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


Idempotency is managed in-memory using a Set. In real-world scenarios, you’d likely use Redis or another persistent store.


##  Assumptions that I made


Each provider has a circuit breaker that opens after 3 consecutive failures and resets after 10 seconds.

Workflow Summary
sendEmail(emailId, to, content) is called.


## working


If it fails, the system automatically falls back to the second provider.

Duplicate email attempts are avoided using emailId (idempotency).


##  Example Output

The result of each attempt is logged and tracked.

Example Output
vbnet
Copy
Edit
[EmailService] 2025-06-08T02:29:07.068Z: Provider ProviderA failed: ProviderA failed to send email.
[EmailService] 2025-06-08T02:29:07.581Z: ProviderB sent email to test@example.com
Send result: ProviderB sent email to test@example.com
Status: SENT

```

---


Created by- 
Mohammad Rizwan :)


For feedback or collaboration, feel free to reach out via GitHub or LinkedIn.
