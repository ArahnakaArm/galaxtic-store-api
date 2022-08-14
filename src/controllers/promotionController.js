import { MonthlyPromotion } from '../models/index.js';
import { commonPost, createMonthlyPromotion, removeMonthlyPromotion } from '../services/databaseService.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';

const postMonthlyPromotion = async (req, res) => {
    const body = req.body;
    const promotion = await createMonthlyPromotion(body);

    if (!promotion) {
        return returnSystemError(res);
    }

    return returnCreated(res, promotion);
};

const deleteMonthlyPromotion = async (req, res) => {
    const body = req.body;
    const monthlyPromotionId = body.monthly_promotion_id || '';
    const dbObj = await removeMonthlyPromotion(monthlyPromotionId);

    if (dbObj.dbStatus === 'not found') {
        return returnNotfound(res);
    }

    return returnSuccess(res);
};

export { postMonthlyPromotion, deleteMonthlyPromotion };
