import { z } from 'zod';


export const restaurantSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, "Name must be at least 3 characters")
            .max(100, "Name must be at most 100 characters"),
        description: z.string()
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description must be at most 500 characters"),
        phone: z.string()
            .min(10, "Phone number must be at least 10 characters")
            .max(15, "Phone number must be at most 15 characters")
            .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
        userId: z.string()
            .min(1, "User ID is required"),
        numberOfUsers: z.number()
            .int("Number of users must be an integer")
            .min(1, "Number of users must be at least 1")
            .max(1000, "Number of users must be at most 1000"),
        averageRating: z.number()
            .min(1, "Average rating must be at least 1")
            .max(5, "Average rating must be at most 5")
            .optional(),
        totalRating: z.number()
            .int("Total rating must be an integer")
            .min(0, "Total rating must be at least 0")
            .optional(),
        address: z.string()
            .min(10, "Address must be at least 10 characters")
            .max(500, "Address must be at most 500 characters").optional(),
        city: z.string()
            .min(2, "City must be at least 2 characters")
            .max(100, "City must be at most 100 characters").optional(),
        state: z.string()
            .min(2, "State must be at least 2 characters")
            .max(100, "State must be at most 100 characters").optional(),
        country: z.string()
            .min(2, "Country must be at least 2 characters")
            .max(100, "Country must be at most 100 characters").optional(),
        pinCode: z.string()
            .length(6, "Pin code must be 6 digits")
            .regex(/^\d{6}$/, 'Invalid pin code format').optional(),

    })
});



export const restaurantAnalyticsSchema = z.object({
    body: z.object({
        restaurantId: z.string()
            .min(1, "Restaurant ID is required"),
        userId: z.string()
            .min(1, "User ID is required"),
        numberOfUsers: z.number()
            .int("Number of users must be an integer")
            .min(1, "Number of users must be at least 1")
            .max(1000, "Number of users must be at most 1000"),
        averageRating: z.number()
            .min(1, "Average rating must be at least 1")
            .max(5, "Average rating must be at most 5")
            .optional(),
        totalRating: z.number()
            .int("Total rating must be an integer")
            .min(0, "Total rating must be at least 0")
            .optional(),

        revenue: z.number()
            .min(0, "Revenue must be at least 0")
            .optional(),
        visitors: z.number()
            .int("Visitors must be an integer")
            .min(1, "Number of visitors must be at least 1")
            .optional(),
        orderCount: z.number()
            .int("Order count must be an integer")
            .min(0, "Order count must be at least 0")
            .optional(),
        rating: z.number()
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be at most 5")
            .optional(),
        review: z.string()
            .min(10, "Review must be at least 10 characters")
            .max(500, "Review must be at most 500 characters")
            .optional(),
    })
});