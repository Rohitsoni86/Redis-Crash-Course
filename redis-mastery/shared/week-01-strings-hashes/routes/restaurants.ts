import { Router } from 'express';
const router: Router = Router();
import { validate } from '../middlewares/validate.js';

import { createRestaurantAnalyticsHandler, createRestaurantHandler, getRestaurantHandler, increaseVisitCountHandler, updateRestaurantHandler } from '../controllers/restaurant.controller.js';
import { restaurantAnalyticsSchema, restaurantSchema } from '../validations/restaurant.validation.js';


// router.post('/', (req, res) => {
//     console.log("Restaurant route hit");
//     res.send('Restaurants endpoint');
// });

router.post('/create-restaurant', validate(restaurantSchema), createRestaurantHandler);

router.get('/get-restaurant/:id', getRestaurantHandler)

router.patch('/update-restaurant/:id', validate(restaurantSchema), updateRestaurantHandler)


router.post('/create-restaurant-analytics', validate(restaurantAnalyticsSchema), createRestaurantAnalyticsHandler)


router.post('/increase-visit-count/:restaurantId', increaseVisitCountHandler)


export default router;
