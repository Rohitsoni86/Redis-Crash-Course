import { redisClient } from '../redis/client';
import { authKeys } from '../redis/keys';
import { TTL } from '../redis/ttl';

export class OtpCounterService {
    /**
     * Increments the OTP resend count for a given phone.
     * Throws an error if the maximum limit is exceeded.
     * @param phone Phone number
     * @param maxLimit Maximum allowed OTP requests
     */
    static async incrementAndCheckResendCount(phone: string, maxLimit: number = 5): Promise<void> {
        const key = authKeys.otpResendCount(phone);
        
        // INCR increments the number stored at key by one. If the key does not exist, it is set to 0 before performing the operation.
        const currentCount = await redisClient.incr(key);

        if (currentCount === 1) {
            // Set expiry on the first request
            await redisClient.expire(key, TTL.OTP_RESEND_COUNT_EXPIRY_SECONDS);
        }

        if (currentCount > maxLimit) {
            const ttl = await redisClient.ttl(key);
            const error: any = new Error(`Rate limit exceeded. Please try again in ${ttl} seconds.`);
            error.status = 429;
            error.code = 'RATE_LIMIT_EXCEEDED';
            error.category = 'AUTH_ERROR';
            throw error;
        }
    }
}
