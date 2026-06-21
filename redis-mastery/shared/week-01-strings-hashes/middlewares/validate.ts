import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import type { ZodObject } from 'zod';

/**
 * Generic middleware to parse and validate req.body, req.query, and req.params 
 * against a provided Zod schema. Passes validation errors to the global error handler.
 */
export const validate = (schema: ZodObject<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        console.log("Validate Body", req.body);
        console.log("Validate Query", req.query);
        console.log("Validate Params", req.params);
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedError: any = new Error(error.issues.map((e) => e.message).join(', '));
                formattedError.status = 400;
                formattedError.code = 'VALIDATION_ERROR';
                return next(formattedError);
            }
            return next(error);
        }
    };
};
