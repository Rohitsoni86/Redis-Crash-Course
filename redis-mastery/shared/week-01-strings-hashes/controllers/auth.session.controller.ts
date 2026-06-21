
import type { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { login } from '../services/auth.session.service.js';

export const loginSessionHandler = catchAsync(async (req: Request, res: Response) => {
    const { phone, role, otp, userId } = req.body;
    const response = await login(phone, role, otp, userId);
    res.status(200).json({
        status: 'success',
        data: response,
    });
});
