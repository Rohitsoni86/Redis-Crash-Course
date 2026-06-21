import { redisClient } from '../redis/client.js';
import { authKeys } from '../redis/keys.js';
import { TTL } from '../redis/ttl.js';



export const login = async (phone: string, role: string, otp: string, userId: string): Promise<{ message: string }> => {
    // 1. Get OTP from Redis
    const otpKey = authKeys.otp(phone);
    const storedOtp = await redisClient.get(otpKey);

    // 2. Check if OTP exists
    if (!storedOtp) {
        throw new Error('OTP expired or invalid');
    }

    // 3. Check if OTP matches
    if (storedOtp !== otp) {
        throw new Error('Invalid OTP');
    }

    // 4. Delete OTP after successful verification
    await redisClient.del(otpKey);

    const sessionKey = authKeys.session(userId, Date.now());
    await redisClient.setEx(sessionKey, TTL.SESSION_EXPIRY_SECONDS, role);

    // 5. Return success
    return {
        message: 'OTP verified successfully',
    };
}
