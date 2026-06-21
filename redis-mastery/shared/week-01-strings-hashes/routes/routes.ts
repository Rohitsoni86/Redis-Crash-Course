import { Router } from "express";
import authRoutes from './auth.routes.js';

const router: Router = Router();

// use api/v1 AND Redirect to auth
router.use('/auth', authRoutes);

export default router;