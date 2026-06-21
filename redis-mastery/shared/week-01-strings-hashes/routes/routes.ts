import { Router } from "express";
import authRoutes from './auth.routes';

const router = Router();

// use api/v1 AND Redirect to auth
router.use('/auth', authRoutes);

export default router;