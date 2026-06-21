OTP SERVICE

First real production feature.

Business Requirement

Restaurant owner wants login.

Enter Phone
      ↓
Generate OTP
      ↓
Store OTP
      ↓
Verify OTP
      ↓
Create Session


Redis Keys Design


Never do:

otp

Instead:

userid:otp:+919876543210

Reason:

Namespace
Isolation
Scalability


Phase 1: OTP Generation, Storage, and Rate Limiting System
The goal is to implement the first phase of the authentication system where a user provides a phone number to receive an OTP. We will build the entire flow from route definition to Redis integration, including rate-limiting the number of times an OTP can be requested.

User Review Required
IMPORTANT

Please review the TTL (Time-To-Live) and rate limits defined below. Are you comfortable with a 30-second expiry for the OTP and a 5 times per hour resend limit?

WARNING

Currently, the actual SMS sending mechanism will be mocked using our LoggerFactory. Let me know if you want to integrate a real provider (like Twilio or AWS SNS) right away.

Proposed Changes
We will systematically build the modules moving from the infrastructure layer (Redis) up to the routing layer.

1. Redis Key & TTL Management
We'll define standardized factory functions and constants to prevent magic strings and ensure isolated namespaces as mentioned in OPT_SERVICE.md.

[NEW] redis/keys.ts
Implement authKeys.otp(phone) => auth:otp:{phone}
Implement authKeys.otpResendCount(phone) => auth:otp:resend_count:{phone}
[NEW] redis/ttl.ts
Implement constants: OTP_EXPIRY_SECONDS = 30
Implement constants: OTP_RESEND_COUNT_EXPIRY_SECONDS = 3600 (1 hour)
2. Utilities & Validation
Isolated utilities for pure logic.

[NEW] utils/otp.ts
Create a generateOTP(length: number = 6): string function using the crypto module for cryptographically secure OTPs.
[NEW] validations/auth.validation.ts
Create sendOtpSchema using Zod to strictly validate the incoming phone parameter format.
3. Service Layer
The core business logic.

[NEW] services/otpCounter.service.ts
incrementAndCheckResendCount(phone): Uses Redis INCR to count attempts. If INCR returns 1 (first attempt), it applies an EXPIRE command using OTP_RESEND_COUNT_EXPIRY_SECONDS. Throws a rate-limit error if the count exceeds the threshold (e.g., 5).
[NEW] services/auth.service.ts
sendOtp(phone):
Calls otpCounter.incrementAndCheckResendCount(phone).
Generates an OTP via generateOTP().
Stores it in Redis via SETEX with a 30-second TTL.
Mocks sending the SMS using the Logger.
4. Controllers & Routes
The HTTP interface.

[NEW] controllers/auth.controller.ts
Extracts the payload, validates it against sendOtpSchema, calls authService.sendOtp(phone), and returns a standardized JSON response.
[NEW] routes/auth.routes.ts
Defines POST /send-otp and maps it to auth.controller.ts.
[MODIFY] routes/routes.ts
Mounts authRoutes under /api/v1/auth.
[MODIFY] src/server.ts
Imports routes.ts and maps it to the Express app.
Verification Plan
Automated Tests
Currently no automated test suite is integrated, but we can test manually using cURL or Postman.

Manual Verification
Send OTP: Send a POST /api/v1/auth/send-otp request.
Redis Expiry Check: Use redis-cli or similar tools to verify the key auth:otp:{phone} is created and disappears automatically after 30 seconds.
Rate Limit Testing: Call the same endpoint 6 times in quick succession to verify the otpCounter.service.ts successfully blocks the 6th request with a 429 Too Many Requests error.