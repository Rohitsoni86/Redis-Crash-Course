import type { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { createRestaurant, createRestaurantAnalytics, getRestaurant, increaseVisitCount, updateRestaurant } from '../services/restaurant.service.js';


export const createRestaurantHandler = catchAsync(async (req: Request, res: Response) => {
    const { name, description, phone, userId, numberOfUsers, averageRating, totalRating, address, city, state, country, pinCode } = req.body;
    const response = await createRestaurant(name, description, phone, userId, numberOfUsers, averageRating, totalRating, address, city, state, country, pinCode);
    res.status(200).json({
        status: 'success',
        data: response,
    });
});


export const getRestaurantHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
        throw new Error('Invalid restaurant id');
    }
    const response = await getRestaurant(id);
    res.status(200).json({
        status: 'success',
        data: response,
    });
});

// update 

export const updateRestaurantHandler = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
        throw new Error('Invalid restaurant id');
    }
    const response = await updateRestaurant(id, req.body);
    res.status(200).json({
        status: 'success',
        data: response,
    });
});


export const createRestaurantAnalyticsHandler = catchAsync(async (req: Request, res: Response) => {
    const { restaurantId, userId, numberOfUsers, averageRating, totalRating, revenue, visitors, orderCount, rating, review } = req.body;
    const response = await createRestaurantAnalytics(restaurantId, userId, numberOfUsers, averageRating, totalRating, revenue, visitors, orderCount, rating, review);
    res.status(200).json({
        status: 'success',
        data: response,
    });
});

//increaseVisitCountHandler

export const increaseVisitCountHandler = catchAsync(async (req: Request, res: Response) => {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId || typeof restaurantId !== 'string') {
        throw new Error('Invalid restaurant id');
    }
    const response = await increaseVisitCount(restaurantId);
    res.status(200).json({
        status: 'success',
        data: response,
    });
});