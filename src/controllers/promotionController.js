import {
    getMonthlyPromotion,
    getMonthlyPromotionById,
    createMonthlyPromotion,
    removeMonthlyPromotion,
} from '../services/databaseServices/promotionDatabaseService.js';
import dbStatus from '../utils/enum/dbStatus.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';

const getAllMonthlyPromotion = async (req, res) => {
    const dbObj = await getMonthlyPromotion();

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }
    return returnSuccess(res, dbObj.data);
};

const getByIdMonthlyPromotion = async (req, res) => {
    const monthlyPromotionId = req.params.monthlyPromotionId || '';

    const dbObj = await getMonthlyPromotionById(monthlyPromotionId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postMonthlyPromotion = async (req, res) => {
    const body = req.body;
    const dbObj = await createMonthlyPromotion(body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnCreated(res, dbObj.data);
};

const deleteMonthlyPromotion = async (req, res) => {
    const monthlyPromotionId = req.params.monthlyPromotionId || '';

    const dbObj = await removeMonthlyPromotion(monthlyPromotionId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res);
};

export { getAllMonthlyPromotion, getByIdMonthlyPromotion, postMonthlyPromotion, deleteMonthlyPromotion };
