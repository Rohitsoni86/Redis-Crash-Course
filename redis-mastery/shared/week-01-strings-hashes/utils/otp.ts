import crypto from 'crypto';

/**
 * Generates a cryptographically secure random numeric OTP
 * @param length Length of the OTP, default is 6
 * @returns string
 */
export const generateOTP = (length: number = 6): string => {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += crypto.randomInt(0, 10).toString();
    }
    return otp;
};
