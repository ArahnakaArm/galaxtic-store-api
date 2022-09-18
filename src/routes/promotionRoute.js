import express from 'express';
import {
    getAllMonthlyPromotion,
    getByIdMonthlyPromotion,
    postMonthlyPromotion,
    deleteMonthlyPromotion,
} from '../controllers/promotionController.js';
import { auth, userRoleValidate } from '../services/middleware/auth.js';
import { postMonthlyPromotionValidate } from '../services/validate/promotionValidator.js';
import path from '../utils/enum/path.js';
import incommingLog from '../services/middleware/incommingLog.js';

const PromotionRoute = express.Router();

const { PROMOTION } = path;

const prefix = '/promotion';

PromotionRoute.get(prefix + PROMOTION.MONTHLY_PROMOTION, [incommingLog], getAllMonthlyPromotion);
PromotionRoute.get(prefix + PROMOTION.MONTHLY_PROMOTION_BY_ID, [incommingLog], getByIdMonthlyPromotion);
PromotionRoute.post(
    prefix + PROMOTION.MONTHLY_PROMOTION,
    [incommingLog, auth, userRoleValidate, postMonthlyPromotionValidate],
    postMonthlyPromotion,
);
PromotionRoute.delete(
    prefix + PROMOTION.DELETE_MONTHLY_PROMOTION,
    [incommingLog, auth, userRoleValidate],
    deleteMonthlyPromotion,
);

export default PromotionRoute;
