import {
    findAllShippingInfoByMe,
    findByIdShippingInfoByMe,
    createShippingInfoByMe,
    putUpdateShippingInfoByme,
    patchUpdateShippingInfoByme,
    removeShippingInfoByme,
} from '../services/databaseServices/shippingDatabaseService.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';
import dbStatus from '../utils/enum/dbStatus.js';

const getShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const userId = body.user_id;
    const dbObj = await findAllShippingInfoByMe(userId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }
    return returnSuccess(res, dbObj.data);
};

const getByIdShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const userId = body.user_id;
    const shippingInfoId = req.params.shippingInfoId || '';
    const dbObj = await findByIdShippingInfoByMe(shippingInfoId, userId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const userId = body.user_id;

    const dbObj = await createShippingInfoByMe(userId, body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnCreated(res, dbObj.data);
};

const putShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const shippingInfoId = req.params.shippingInfoId || '';

    const dbObj = await putUpdateShippingInfoByme(shippingInfoId, body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const patchShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const shippingInfoId = req.params.shippingInfoId || '';
    const userId = body.user_id;

    const dbObj = await patchUpdateShippingInfoByme(shippingInfoId, userId, body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const deleteShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const shippingInfoId = req.params.shippingInfoId || '';
    const userId = body.user_id;

    const dbObj = await removeShippingInfoByme(userId, shippingInfoId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res);
};

export {
    getShippingInfoByMe,
    getByIdShippingInfoByMe,
    postShippingInfoByMe,
    putShippingInfoByMe,
    patchShippingInfoByMe,
    deleteShippingInfoByMe,
};
