import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import requestLogger from '../middlewares/requestLogger';
import ErrorLogger from '../middlewares/errorLogger';
import LoggerFactory from '../utils/logger/LoggerFactory';

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

app.get('/', (req, res) => {
    logger.info({ route: '/' }, 'Root endpoint was hit successfully');
    res.send('Hello World!');
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

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
