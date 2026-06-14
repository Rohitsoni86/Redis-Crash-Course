import { z } from "zod";

// export const RestaurantSchema = z.object({
//     name: z.string().min(3),
//     address: z.string(),
//     phone: z.string(),
//     email: z.string().email(),
//     cuisine: z.array(z.string().trim().min(1).toLowerCase()),
//     rating: z.number().min(1).max(5),
//     price: z.number().min(1).max(100),
// })

export const RestaurantSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 characters long"),
    address: z.string().min(3, "Address must be atleast 3 characters long"),
    cuisines: z.array(z.string().trim().min(1).toLowerCase()),
})

export const RestaurantDetailsSchema = z.object({
    links: z.array(z.object({
        name: z.string().optional(),
        url: z.string().url().optional(),
    })).optional(),
    contact: z.object({
        phone: z.string().length(10, "Phone must be 10 characters long").optional(),
        email: z.string().email("Invalid email address").optional(),
    }).optional()

})



export type TRestaurant = z.infer<typeof RestaurantSchema>
export type TRestaurantDetails = z.infer<typeof RestaurantDetailsSchema>
