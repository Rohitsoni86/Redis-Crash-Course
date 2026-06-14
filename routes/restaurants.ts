import express from 'express';
import { validate } from '../middlewares/validate.js';
import { RestaurantSchema, type TRestaurant } from '../schemas/restaurants.js';
import { nanoid } from 'nanoid';
import { initializeRedisClient } from '../utils/redis-client.js';
import { restaurantKeyById } from '../utils/redis-keys.js';
import { errorResponse, successResponse } from '../utils/responses.js';
import type { NextFunction } from 'express';

const router = express.Router();

router.post('/', validate(RestaurantSchema), async (req, res, next: NextFunction) => {
  try {
    const restaurant = req.body as TRestaurant;

    const redisClient = await initializeRedisClient()

    const newRestaurant = {
      id: nanoid(),
      ...restaurant,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const extractedObject = {
      id: newRestaurant.id,
      name: newRestaurant.name,
      location: newRestaurant.address
    }

    console.log("1111", extractedObject)
    // Create Redis Key For each Restaurant

    const restaurantKey = restaurantKeyById(newRestaurant.id)
    console.log("restaurantKey", restaurantKey)

    // Set Restaurant Key

    const result = await redisClient.hSet(restaurantKey, extractedObject)
    console.log("Result After Adding Restaurant : ", result)

    return successResponse(res, newRestaurant, 201, "Restaurant Added Successfully",)

    //EAjOvDletcP2nieOJHF7G

  } catch (error) {
    next(error)
  }
});


// Get All Restaurant Details by id

router.get('/:id', async (req, res, next: NextFunction) => {
  try {
    const { id } = req.params
    const redisClient = await initializeRedisClient()
    const restaurantKey = restaurantKeyById(id)

    // check first restaurant exists or not
    const restaurantExists = await redisClient.exists(restaurantKey)
    if (!restaurantExists) {
      return errorResponse(res, 404, "Restaurant Not Found")
    }

    const result = await redisClient.hGetAll(restaurantKey)
    console.log("Result After Getting Restaurant : ", result)
    return successResponse(res, result, 200, "Restaurant Fetched Successfully")
  } catch (error) {
    next(error)
  }
})


// get specific field from restaurant details using hget

router.get("/:id/:field", async (req, res, next: NextFunction) => {
  try {

    const { id, field } = req.params
    const redisClient = await initializeRedisClient()
    const restaurantKey = restaurantKeyById(id)


    // check first restaurant exists or not
    const restaurantExists = await redisClient.exists(restaurantKey)
    if (!restaurantExists) {
      return errorResponse(res, 404, "Restaurant Not Found")
    }

    const result = await redisClient.hGet(restaurantKey, field)
    console.log("Result After Getting Field : ", result)
    return successResponse(res, result, 200, "Field Fetched Successfully")
  } catch (error) {
    next(error)
  }
})







export default router;
