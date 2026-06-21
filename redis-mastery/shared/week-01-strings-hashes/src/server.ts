import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import requestLogger from '../middlewares/requestLogger';
import ErrorLogger from '../middlewares/errorLogger';
import LoggerFactory from '../utils/logger/LoggerFactory';
import { redisService } from '../redis/client';
import routes from '../routes/routes';

dotenv.config();

const app = express();
const logger = LoggerFactory.getInstance().getLogger('server');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use(requestLogger);

// Routes
app.use('/api/v1', routes);

app.get('/', (req, res) => {
    logger.info({ route: '/' }, `Root endpoint was hit successfully`);
    res.send('Hello World!');
});

app.get('/health/redis', async (req, res) => {
    const isHealthy = await redisService.ping();
    if (isHealthy) {
        logger.info({ route: '/health/redis', isHealthy }, 'Redis health check passed');
        res.status(200).json({ status: 'OK', redis: 'Connected' });
    } else {
        logger.error({ route: '/health/redis' }, 'Redis health check failed');
        res.status(503).json({ status: 'ERROR', redis: 'Disconnected' });
    }
});

// Example error route to demonstrate the ErrorLogger
app.get('/error', (req, res, next) => {
    const error: any = new Error('This is an intentional test error to demonstrate logging!');
    error.status = 400;
    error.code = 'TEST_ERROR';
    error.category = 'TESTING';
    next(error);
});

// Error Handler Middleware
// Must be the last middleware added
app.use(ErrorLogger.errorHandler());

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to Redis first
        await redisService.connect();

        // Then start listening for HTTP requests
        const server = app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });

        // Graceful Shutdown logic
        const gracefulShutdown = async (signal: string) => {
            logger.info(`${signal} received. Shutting down gracefully...`);

            server.close(async () => {
                logger.info('HTTP server closed.');
                await redisService.disconnect();
                logger.info('Server gracefully terminated.');
                process.exit(0);
            });

            // Force close if taking too long (10 seconds)
            setTimeout(() => {
                logger.fatal('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 10000);
        };

        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    } catch (error) {
        logger.fatal({ error }, 'Failed to start server');
        process.exit(1);
    }
};

startServer();
