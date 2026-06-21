export const authKeys = {
    otp: (phone: string) => `auth:otp:${phone}`,
    otpResendCount: (phone: string) => `auth:otp:resend_count:${phone}`,
};