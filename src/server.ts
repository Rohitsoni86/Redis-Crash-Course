import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import restaurantsRouter from '../routes/restaurants.js';
import cuisinesRouter from '../routes/cuisines.js';
import { errorHandler } from '../middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

// Routes
app.use('/restaurants', restaurantsRouter);
app.use('/cuisines', cuisinesRouter);

app.get('/', (req, res) => {
    console.log('Request hit');
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
