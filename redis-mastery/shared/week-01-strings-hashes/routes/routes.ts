import { Router } from "express";
import authRoutes from './auth.routes.js';
import restaurantRoutes from './restaurants.js';

const router: Router = Router();

// use api/v1 AND Redirect to auth
router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);

export default router;