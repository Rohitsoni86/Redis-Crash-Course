import { z } from 'zod';

export const sendOtpSchema = z.object({
    phone: z.string()
        .min(10, "Phone number must be at least 10 characters")
        .max(15, "Phone number must be at most 15 characters")
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});
