import { redisClient } from '../redis/client.js';
import { authKeys } from '../redis/keys.js';
import { TTL } from '../redis/ttl.js';
import { generateOTP } from '../utils/otp.js';
import { incrementAndCheckResendCount } from './otpCounter.service.js';
import LoggerFactory from '../utils/logger/LoggerFactory.js';

const logger = LoggerFactory.getInstance().getLogger('authService');

export const sendOtp = async (phone: string): Promise<{ message: string; expiry: number, otp: string }> => {
    // 1. Check rate limit
    await incrementAndCheckResendCount(phone);

    // 2. Generate OTP
    const otp = generateOTP(6);

    // 3. Store OTP in Redis
    const otpKey = authKeys.otp(phone);
    await redisClient.setEx(otpKey, TTL.OTP_EXPIRY_SECONDS, otp);

    // 4. Mock sending the OTP
    logger.info({ phone, otp }, 'Mock SMS: OTP sent successfully');

    return {
        message: 'OTP sent successfully',
        expiry: TTL.OTP_EXPIRY_SECONDS,
        otp: otp,
    };
};


export const verifyOtp = async (phone: string, otp: string): Promise<{ message: string }> => {
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

    // 5. Return success
    return {
        message: 'OTP verified successfully',
    };
}