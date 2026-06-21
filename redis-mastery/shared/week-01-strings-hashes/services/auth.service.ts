import { redisClient } from '../redis/client';
import { authKeys } from '../redis/keys';
import { TTL } from '../redis/ttl';
import { generateOTP } from '../utils/otp';
import { OtpCounterService } from './otpCounter.service';
import LoggerFactory from '../utils/logger/LoggerFactory';

export class AuthService {
    private static logger = LoggerFactory.getInstance().getLogger('authService');

    static async sendOtp(phone: string): Promise<{ message: string; expiry: number }> {
        // 1. Check rate limit
        await OtpCounterService.incrementAndCheckResendCount(phone);

        // 2. Generate OTP
        const otp = generateOTP(6);

        // 3. Store OTP in Redis
        const otpKey = authKeys.otp(phone);
        await redisClient.setEx(otpKey, TTL.OTP_EXPIRY_SECONDS, otp);

        // 4. Mock sending the OTP
        this.logger.info({ phone, otp }, 'Mock SMS: OTP sent successfully');

        return {
            message: 'OTP sent successfully',
            expiry: TTL.OTP_EXPIRY_SECONDS,
        };
    }
}
