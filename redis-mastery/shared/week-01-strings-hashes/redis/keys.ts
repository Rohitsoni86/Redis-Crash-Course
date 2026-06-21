export const authKeys = {
    otp: (phone: string) => `auth:otp:${phone}`,
    otpResendCount: (phone: string) => `auth:otp:resend_count:${phone}`,
    session: (userId: string, timeStamp: number) => `auth:session:${timeStamp}:${userId}`,
};

export const restaurantKeys = {

    restaurant: (restaurantId: string) => `restaurant:${restaurantId}`,
    allRestaurants: 'restaurant:all',

    // analytics

    restaurantAnalytics: (restaurantId: string) => `${restaurantId}:analytics`,
    allRestaurantAnalytics: `restaurant:all:analytics`,


};