export const authKeys = {
    otp: (phone: string) => `auth:otp:${phone}`,
    otpResendCount: (phone: string) => `auth:otp:resend_count:${phone}`,
    session: (userId: string, timeStamp: number) => `auth:session:${timeStamp}:${userId}`,
};