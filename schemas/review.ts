import { z } from "zod";

export const ReviewSchema = z.object({
    rating: z.number().min(1, "Rating must be atleast 1").max(5, "Rating must be atmost 5"),
    review: z.string().min(1, "Review cannot be empty"),
})

export type TReview = z.infer<typeof ReviewSchema>
