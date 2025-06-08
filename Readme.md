# Resilient Email Sending Service

A fault-tolerant email service simulation in **JavaScript** that mimics production-grade email systems using retry logic, fallback mechanisms, circuit breakers, and more. Uses mock providers instead of real email APIs.

---

## 🚀 Features

* ✅ Retry with Exponential Backoff
* ✅ Fallback Between Providers
* ✅ Circuit Breaker Per Provider
* ✅ Idempotency via `emailId`
* ✅ Basic Rate Limiting (5 emails/sec)
* ✅ Status Tracking (`SENT`, `FAILED`, `UNKNOWN`)
* ✅ Simple Logging
* ✅ Mock Providers (for simulation)

---

## 🛠 Setup Instructions

### 1. Clone or Create Project Folder

```bash
mkdir resilient-email-service && cd resilient-email-service
code .  # Opens VS Code
```

### 2. Initialize Node Project

```bash
npm init -y
```

### 3. Install Dev Dependencies

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

### 6. Run the App

```bash
node index.js
```

### 7. Run the Tests

```bash
npm test
```

---

## 📁 File Structure

```
resilient-email-service/
├── EmailService.js         # Main email service logic
├── index.js                # Example usage
├── EmailService.test.js    # Unit tests
└── package.json            # NPM config
```

---

## 📌 Assumptions

* Two mock providers simulate success/failure (e.g., ProviderA with 50% fail rate).
* Idempotency is stored in memory (using a `Set`). In production, a persistent store like Redis would be used.
* Rate limiting is fixed to 5 emails per second.
* Circuit breaker opens after 3 consecutive failures and resets after 10 seconds.

---

## 🔍 How it Works

1. Call `sendEmail(emailId, to, content)`
2. It tries provider 1 with retries (with exponential backoff)
3. If it fails, it falls back to provider 2
4. Prevents re-sending same email (idempotent)
5. If rate limit exceeded, the request is queued
6. Tracks and logs status of every attempt

---

## ✅ Example Output

```
[EmailService] 2025-06-08T02:29:07.068Z: Provider ProviderA failed: ProviderA failed to send email.
[EmailService] 2025-06-08T02:29:07.581Z: ProviderB sent email to test@example.com
Send result: ProviderB sent email to test@example.com
Status: SENT
```

---

## 👨‍🔬 Author

Mohammad Rizwan

---


