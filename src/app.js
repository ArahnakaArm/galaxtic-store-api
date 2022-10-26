import express from 'express';
import { logger } from './initLogging.js';
import { sequelize } from './models/index.js';
import UserRoute from './routes/userRoute.js';
import PromotionRoute from './routes/promotionRoute.js';
import ShippingRoute from './routes/shippingRoute.js';
import ShopRoute from './routes/shopRoute.js';
import CategoryRoute from './routes/categoryRoute.js';
import ProductRoute from './routes/productRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import { systemInfoLogs, systemErrorLogs } from './services/logging.js';
import LOG_SERVICES from './utils/enum/logs.js';

const app = express();

const apiGroupPrefix = '/api';

app.use(bodyParser.json());
app.use(cors());

sequelize
    .sync()
    .then(() => {
        console.log('Sync table  successfully!');
        systemInfoLogs(LOG_SERVICES.DB.DATABASE, LOG_SERVICES.DB.CONNECT_SUCCESS);
    })
    .catch((error) => {
        console.error('Unable to Sync table : ', error);
        systemErrorLogs(LOG_SERVICES.DB.DATABASE, LOG_SERVICES.DB.CONNECT_FAILED);
    });

app.use(apiGroupPrefix, UserRoute);
app.use(apiGroupPrefix, PromotionRoute);
app.use(apiGroupPrefix, ShippingRoute);
app.use(apiGroupPrefix, ShopRoute);
app.use(apiGroupPrefix, CategoryRoute);
app.use(apiGroupPrefix, ProductRoute);

export { app };
