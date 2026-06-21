import LoggerFactory from "../utils/logger/LoggerFactory.js";
import type { NextFunction, Request, Response } from "express";


const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const Logger = LoggerFactory.getInstance().getLogger();

        const startTime = process.hrtime();

        res.on('finish', () => {
            const [seconds, nanoseconds] = process.hrtime(startTime);
            const responseTime = (seconds * 1000 + nanoseconds / 1e9).toFixed(2);


            const logData = {
                method: req.method,
                url: req.url,
                statusCode: res.statusCode,
                responseTime: `${responseTime}ms`,
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                body: req.body,
                query: req.query,
                correlationId: req.headers['x-request-id'],
            };

            if (res.statusCode < 400) {
                Logger.info(logData, 'Request completed successfully');
            } else {
                Logger.error(logData, 'Request failed');
            }
        });

        next();


}

export default requestLogger;


// Request Logging Best Practices:

// Log at the beginning and end of requests
// Include correlation IDs
// Track response times
// Log user context when available
// Exclude sensitive data
// Include relevant headers
