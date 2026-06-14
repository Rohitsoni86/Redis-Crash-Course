import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";
import { errorResponse } from "../utils/responses.js";

export const validate = <T>(
    schema: ZodSchema<T, any, any>,
    source: 'body' | 'query' | 'params' = 'body'
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = source === 'body' ? req.body :
                source === 'query' ? req.query :
                    req.params;
            const result = schema.safeParse(data);
            if (!result.success) {
                errorResponse(res, 400, result?.error?.message)
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                errorResponse(res, 400, error.message)
            }
            next();
        }
    }
}