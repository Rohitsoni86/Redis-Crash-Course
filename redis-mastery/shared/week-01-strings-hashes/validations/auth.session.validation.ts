import { z } from 'zod';


export const loginSchema = z.object({
    body: z.object({
        phone: z.string()
            .min(10, "Phone number must be at least 10 characters")
            .max(15, "Phone number must be at most 15 characters")
            .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
        role: z.enum(["ADMIN", "USER", "GUEST"]),
        otp: z.string()
            .length(6, "OTP must be 6 digits")
            .regex(/^\d{6}$/, 'Invalid OTP format'),
        userId: z.string()
            .min(1, "User ID is required"),
    })
});
