# 🪵 The LOGGER Guide: A Production-Ready Logging Setup with Pino

Welcome to the comprehensive logging setup guide for our application. This document details the architecture of our custom logger implementation, explains what each module does, and serves as a developer guide for using **Pino** correctly.

---

## 🏗️ Architecture & Modules

Our logging system is built around [Pino](https://github.com/pinojs/pino), an extremely fast Node.js logger. We have structured it using the Singleton and Factory patterns to ensure performance and consistency across the application.

### 1. `utils/logger/constants.ts`
**What it does:** Contains standardized strings for environments and log levels.
**Why:** Prevents typos (e.g., typing `'development'` instead of `'dev'`) and centralizes magic strings.

### 2. `utils/logger/config.ts`
**What it does:** Defines the Pino configuration tailored for different environments (`development`, `production`, `test`). 
**Why:** In development, we use `pino-pretty` to make logs human-readable on the console. In production, we write structured JSON directly to a file (or stdout) for speed and easy ingestion by log aggregators (like Datadog, ELK, or CloudWatch).

### 3. `utils/logger/LoggerFactory.ts`
**What it does:** A Singleton class that acts as the centralized engine for generating and configuring Pino instances.
**Why:** 
- Ensures only one base instance of Pino is created across the app.
- Contains a `#childLoggers` Map to dynamically cache named loggers (e.g., `logger.getLogger('database')`). This prevents memory leaks and CPU overhead from repeatedly recreating loggers.

### 4. `utils/logger/rotation.ts`
**What it does:** Uses `rotating-file-stream` to manage the size and lifespan of log files.
**Why:** Without rotation, a single `app.log` file in production will eventually consume all disk space. This module compresses old logs and deletes them after a certain retention period (e.g., 30 days).

### 5. `middlewares/requestLogger.ts`
**What it does:** An Express middleware that logs every incoming HTTP request and tracks its lifecycle.
**Why:** Automatically calculates response times using `process.hrtime()`, extracts user IPs, records correlation IDs (`x-request-id`), and logs the final status code when the response finishes.

### 6. `middlewares/errorLogger.ts`
**What it does:** A robust error tracking utility that wraps around our logger.
**Why:** Standardizes error logs by forcing the capture of full stack traces, application context, HTTP request context, and system state (memory/uptime). It categorizes errors and triggers alerts for `FATAL_ERROR` or `CRITICAL` issues. It also exports an `errorHandler()` method that can be plugged straight into Express.

---

## 🚀 Pino Developer Guide

Pino is unique compared to older loggers like Winston or Morgan. Because Pino's primary focus is **speed and low overhead**, there are specific ways you should use it.

### 1. Logging Best Practices: Objects First!

Pino expects the **first argument to be an object** and the **second argument to be a string message**. If you flip them, the object will not be parsed properly in production!

✅ **DO THIS:**
```typescript
const logger = LoggerFactory.getInstance().getLogger('auth');

// Correct: Pass an object with metadata first, then the message
logger.info({ userId: 123, action: 'login' }, 'User logged in successfully');
```

❌ **DON'T DO THIS:**
```typescript
// Incorrect: Pino will treat the object as a string interpolation argument
logger.info('User logged in successfully', { userId: 123, action: 'login' });
```

### 2. Getting a Logger Instance

Always use the `LoggerFactory` to get a logger. Provide a name if you are in a specific domain/module.

```typescript
import LoggerFactory from '../utils/logger/LoggerFactory';

// Get a logger specific to a domain (e.g., "database")
const dbLogger = LoggerFactory.getInstance().getLogger('database');

dbLogger.debug('Executing query: SELECT * FROM users');
```

### 3. Error Logging

For standard logs, use the normal `logger.info()`. But when dealing with `try/catch` blocks or Express errors, **always use the `ErrorLogger`**.

```typescript
import ErrorLogger from '../middlewares/errorLogger';

try {
  throw new Error('Database connection failed');
} catch (error) {
  // Use ErrorLogger to automatically capture stack traces and memory usage
  ErrorLogger.logError(error, { 
    userId: req.user.id,
    action: 'fetching_profile'
  });
}
```

### 4. Correlation IDs

A correlation ID allows you to trace a single user's request across multiple microservices or logs. Our `requestLogger` automatically looks for the `x-request-id` header. 
If you are passing logs deep into a service, pass the correlation ID along:
```typescript
logger.info({ correlationId: req.headers['x-request-id'] }, 'Started processing payment');
```

### 5. Environments matter

- **Development:** Your logs will be pretty-printed and colorized.
- **Production:** Logs are strict JSON. Do not rely on pretty formatting in production. Avoid logging huge payloads (like full base64 images) as it blocks the Node.js event loop while writing the JSON string.
