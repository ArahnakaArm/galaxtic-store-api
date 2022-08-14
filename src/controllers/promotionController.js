import { getMonthlyPromotion, createMonthlyPromotion, removeMonthlyPromotion } from '../services/databaseService.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';

const getAllMonthlyPromotion = async (req, res) => {
    const dbObj = await getMonthlyPromotion();

    if (dbObj.dbStatus === 'error') {
        return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postMonthlyPromotion = async (req, res) => {
    const body = req.body;
    const promotion = await createMonthlyPromotion(body);

    if (!promotion) {
        return returnSystemError(res);
    }

    return returnCreated(res, promotion);
};

const deleteMonthlyPromotion = async (req, res) => {
    const monthlyPromotionId = req.params.monthlyPromotionId || '';

    const dbObj = await removeMonthlyPromotion(monthlyPromotionId);

    if (dbObj.dbStatus === 'not found') {
        return returnNotfound(res);
    }

    return returnSuccess(res);
};

export { getAllMonthlyPromotion, postMonthlyPromotion, deleteMonthlyPromotion };
