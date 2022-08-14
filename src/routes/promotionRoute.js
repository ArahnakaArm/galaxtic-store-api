import express from 'express';
import { postMonthlyPromotion, deleteMonthlyPromotion } from '../controllers/promotionController.js';
import { auth, adminRoleValidate, userRoleValidate } from '../services/middleware/auth.js';
import { postMonthlyPromotionValidate } from '../services/validate/promotionValidator.js';
import path from '../utils/enum/path.js';
const PromotionRoute = express.Router();

const { PROMOTION } = path;

const prefix = '/promotion';

PromotionRoute.post(
    prefix + PROMOTION.MONTHLY_PROMOTION,
    [auth, userRoleValidate, postMonthlyPromotionValidate],
    postMonthlyPromotion,
);
PromotionRoute.delete(prefix + PROMOTION.MONTHLY_PROMOTION, [auth, userRoleValidate], deleteMonthlyPromotion);

export default PromotionRoute;
