import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { sendOtpSchema } from '../validations/auth.validation';

export class AuthController {
    static async sendOtp(req: Request, res: Response, next: NextFunction) {
        try {
            // Validate payload
            const validatedData = sendOtpSchema.parse(req.body);

            // Call service
            const response = await AuthService.sendOtp(validatedData.phone);

            // Return success
            res.status(200).json({
                status: 'success',
                data: response,
            });
        } catch (error: any) {
            // Check if it's a Zod validation error
            if (error.name === 'ZodError') {
                error.status = 400;
                error.code = 'VALIDATION_ERROR';
                error.message = error.errors.map((e: any) => e.message).join(', ');
            }
            next(error);
        }
    }
}
