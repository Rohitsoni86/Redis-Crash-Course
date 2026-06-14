import express from 'express';
import { validate } from '../middlewares/validate.js';
import { RestaurantSchema, type TRestaurant } from '../schemas/restaurants.js';
import { nanoid } from 'zod';
import { initializeRedisClient } from '../utils/redis-client.js';

const router = express.Router();

router.post('/', validate(RestaurantSchema), async (req, res) => {
  try {
    const restaurant = req.body as TRestaurant;

    const redisClient = await initializeRedisClient()

    const newRestaurant = {
      id: nanoid("10"),
      ...restaurant,
      reviews: [],
      rating: 0,
      totalReviews: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

  } catch (error) {

  }
});

export default router;
