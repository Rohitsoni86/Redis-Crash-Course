import type { Request, Response } from 'express';
import { sendOtp, verifyOtp } from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.js';

export const sendOtpHandler = catchAsync(async (req: Request, res: Response) => {
    // Validation is already handled by middleware
    const { phone } = req.body;

    // Call functional service
    const response = await sendOtp(phone);

    // Return success
    res.status(200).json({
        status: 'success',
        data: response,
    });
});



export const verifyOtpHandler = catchAsync(async (req: Request, res: Response) => {
    const { phone, otp } = req.body;

    const response = await verifyOtp(phone, otp);

    res.status(200).json({
        status: 'success',
        data: response,
    });
});