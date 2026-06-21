import { redisClient } from '../redis/client.js';
import { restaurantKeys } from '../redis/keys.js';
import { TTL } from '../redis/ttl.js';

const generateRestaurantId = () => {
    const timeStamp = Date.now();
    return restaurantKeys.restaurant(timeStamp.toString());
}

const generateAnalyticsId = (restaurantId: string) => {
    const timeStamp = Date.now();
    return restaurantKeys.restaurantAnalytics(restaurantId);
}

const buildRestaurantHash = (name: string, description: string, phone: string, userId: string, numberOfUsers: number, averageRating: number, totalRating: number, address: string, city: string, state: string, country: string, pinCode: string) => {
    return {
        name,
        description,
        phone,
        userId,
        numberOfUsers,
        averageRating,
        totalRating,
        address,
        city,
        state,
        country,
        pinCode,
    };
}


const buildAnalyticsData = (restaurantId: string, userId: string, numberOfUsers: number, averageRating: number, totalRating: number, revenue: number, visitors: number, orderCount: number, rating: number, review: string) => {
    return {
        restaurantId,
        userId,
        numberOfUsers,
        averageRating,
        totalRating,
        revenue,
        visitors,
        orderCount,
        rating,
        review,
    };
}

const addNewRestaurant = async (restaurantId: string, restaurantData: ReturnType<typeof buildRestaurantHash>) => {
    await redisClient.hSet(restaurantId, restaurantData);
    await redisClient.expire(restaurantId, TTL.SESSION_EXPIRY_SECONDS);

    await redisClient.sAdd(restaurantKeys.allRestaurants, restaurantId);
}


export const createRestaurant = async (name: string, description: string, phone: string, userId: string, numberOfUsers: number, averageRating: number, totalRating: number, address: string, city: string, state: string, country: string, pinCode: string) => {

    const restaurantId = generateRestaurantId();

    const restaurantData = buildRestaurantHash(name, description, phone, userId, numberOfUsers, averageRating, totalRating, address, city, state, country, pinCode);

    await addNewRestaurant(restaurantId, restaurantData);

    return {
        message: 'Restaurant created successfully',
        data: restaurantId,
    };
}


export const getRestaurant = async (restaurantId: string) => {
    const restaurantData = await redisClient.hGetAll(restaurantId);
    return restaurantData;
}


export const updateRestaurant = async (restaurantId: string, restaurantData: ReturnType<typeof buildRestaurantHash>) => {
    await redisClient.hSet(restaurantId, restaurantData);
    await redisClient.expire(restaurantId, TTL.SESSION_EXPIRY_SECONDS);

    return {
        message: 'Restaurant updated successfully',
        data: restaurantId,
    };
}
export const createRestaurantAnalytics = async (restaurantId: string, userId: string, numberOfUsers: number, averageRating: number, totalRating: number, revenue: number, visitors: number, orderCount: number, rating: number, review: string) => {
    const analyticsId = generateAnalyticsId(restaurantId);
    const analyticsData = buildAnalyticsData(restaurantId, userId, numberOfUsers, averageRating, totalRating, revenue, visitors, orderCount, rating, review);
    await addNewAnalytics(analyticsId, analyticsData);
    return {
        message: 'Restaurant analytics created successfully',
        data: analyticsId,
    };
}

const addNewAnalytics = async (analyticsId: string, analyticsData: ReturnType<typeof buildAnalyticsData>) => {
    await redisClient.hSet(analyticsId, analyticsData);
    await redisClient.expire(analyticsId, TTL.SESSION_EXPIRY_SECONDS);

    await redisClient.sAdd(restaurantKeys.allRestaurantAnalytics, analyticsId);
}


export const increaseVisitCount = async (restaurantId: string) => {

    const restaurantAnalyticsId = generateAnalyticsId(restaurantId);

    await redisClient.hIncrBy(restaurantAnalyticsId, 'visitors', 1);
    await redisClient.expire(restaurantAnalyticsId, TTL.SESSION_EXPIRY_SECONDS);
    return {
        message: 'Visit count increased successfully',
        data: restaurantId,
    };
}