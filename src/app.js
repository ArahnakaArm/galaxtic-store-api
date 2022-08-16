import express from 'express';
import { sequelize } from './models/index.js';
const app = express();
import UserRoute from './routes/userRoute.js';
import PromotionRoute from './routes/promotionRoute.js';
import ShippingRoute from './routes/shippingRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';

const apiGroupPrefix = '/api';

app.use(bodyParser.json());
app.use(cors());

sequelize
    .sync()
    .then(() => {
        console.log('Sync table  successfully!');
    })
    .catch((error) => {
        console.error('Unable to Sync table : ', error);
    });

app.use(apiGroupPrefix, UserRoute);
app.use(apiGroupPrefix, PromotionRoute);
app.use(apiGroupPrefix, ShippingRoute);

export { app };
