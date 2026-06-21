import type { Request, Response, NextFunction } from 'express';

/**
 * Wraps async Express controllers to automatically pass rejected promises
 * to the global error handler middleware via next(err).
 * Eliminates the need for repeating try/catch blocks in every controller.
 */
export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
