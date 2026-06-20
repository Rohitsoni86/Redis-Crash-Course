// Error Logging Considerations:
// Capture full stack traces
// Include request context
// Add error codes
// Log related system states
// Enable error categorization
// Implement error alerting

import LoggerFactory from "../utils/logger/LoggerFactory";
import type { NextFunction, Request, Response } from "express";

export interface ErrorContext {
  userId?: string;
  action?: string;
  correlationId?: string;
  [key: string]: any;
}

export class ErrorLogger {
  static logError(error: any, context: ErrorContext = {}, req?: Request) {
    const logger = LoggerFactory.getInstance().getLogger('error');
    
    const errorLog: any = {
      name: error.name || 'Error',
      message: error.message || 'An unexpected error occurred',
      stack: error.stack, // Capture full stack traces
      code: error.code || 'UNKNOWN_ERROR', // Add error codes
      category: error.category || 'SERVER_ERROR', // Enable error categorization
      systemState: { // Log related system states
          memory: process.memoryUsage(),
          uptime: process.uptime()
      },
      ...context,
    };

    // Include request context
    if (req) {
      errorLog.requestContext = {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        correlationId: req.headers['x-request-id'] || context.correlationId,
        // Exclude sensitive data from body/query if necessary, but capturing them here
        body: req.body, 
        query: req.query
      };
    }

    if (error.response) {
      errorLog.response = {
        status: error.response.status,
        data: error.response.data,
      };
    }

    logger.error(errorLog, 'Application error occurred');

    // Implement error alerting
    if (errorLog.category === 'CRITICAL' || errorLog.code === 'FATAL_ERROR') {
      ErrorLogger.triggerAlert(errorLog);
    }
  }

  static logWarning(warning: any, context: ErrorContext = {}) {
    const logger = LoggerFactory.getInstance().getLogger('error');
    
    logger.warn({
      warning: warning.message || warning,
      code: warning.code,
      ...context,
    }, 'Application warning occurred');
  }

  private static triggerAlert(errorLog: any) {
    // Implement error alerting logic here (e.g., Slack, PagerDuty, Email)
    const logger = LoggerFactory.getInstance().getLogger('alert');
    logger.fatal(errorLog, 'CRITICAL ALERT TRIGGERED');
    // Example: sendAlertToSlack(errorLog);
  }

  // Express error handler middleware
  static errorHandler() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
      ErrorLogger.logError(err, { source: 'ExpressErrorHandler' }, req);
      
      const statusCode = err.status || err.statusCode || 500;
      res.status(statusCode).json({
        error: {
          message: err.message || 'Internal Server Error',
          code: err.code || 'SERVER_ERROR'
        }
      });
    };
  }
}

export default ErrorLogger;
