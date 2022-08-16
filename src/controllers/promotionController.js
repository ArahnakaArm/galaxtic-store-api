import {
    getMonthlyPromotion,
    getMonthlyPromotionById,
    createMonthlyPromotion,
    removeMonthlyPromotion,
} from '../services/databaseServices/promotionDatabaseService.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';

const getAllMonthlyPromotion = async (req, res) => {
    const dbObj = await getMonthlyPromotion();

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const getByIdMonthlyPromotion = async (req, res) => {
    const monthlyPromotionId = req.params.monthlyPromotionId || '';

    const dbObj = await getMonthlyPromotionById(monthlyPromotionId);

    if (dbObj.dbStatus === 'Not Found') {
        return returnNotfound(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postMonthlyPromotion = async (req, res) => {
    const body = req.body;
    const dbObj = await createMonthlyPromotion(body);

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    return returnCreated(res, dbObj.data);
};

const deleteMonthlyPromotion = async (req, res) => {
    const monthlyPromotionId = req.params.monthlyPromotionId || '';

    const dbObj = await removeMonthlyPromotion(monthlyPromotionId);

    if (dbObj.dbStatus === 'Not Found') {
        return returnNotfound(res);
    }

    return returnSuccess(res);
};

export { getAllMonthlyPromotion, getByIdMonthlyPromotion, postMonthlyPromotion, deleteMonthlyPromotion };
