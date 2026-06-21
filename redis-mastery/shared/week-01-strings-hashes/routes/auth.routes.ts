import { Router } from 'express';
import { sendOtpHandler, verifyOtpHandler } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { sendOtpSchema, verifyOtpSchema } from '../validations/auth.validation.js';
import { loginSessionHandler } from '../controllers/auth.session.controller.js';
import { loginSchema } from '../validations/auth.session.validation.js';

const router: Router = Router();

router.post('/send-otp', validate(sendOtpSchema), sendOtpHandler);

router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpHandler)


router.post("/login", validate(loginSchema), loginSessionHandler)

export default router;
