import {
    findAllShippingInfoByMe,
    findByIdShippingInfoByMe,
    createShippingInfoByMe,
    putUpdateShippingInfoByme,
    patchUpdateShippingInfoByme,
    removeShippingInfoByme,
} from '../services/databaseServices/shippingDatabaseService.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';

const getShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const userId = body.user_id;
    const dbObj = await findAllShippingInfoByMe(userId);

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const getByIdShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const userId = body.user_id;
    const shippingInfoId = req.params.shippingInfoId || '';
    const dbObj = await findByIdShippingInfoByMe(shippingInfoId, userId);

    if (dbObj.dbStatus === 'Not Found') {
        return returnNotfound(res);
    }

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const userId = body.user_id;

    const dbObj = await createShippingInfoByMe(userId, body);

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    return returnCreated(res, dbObj.data);
};

const putShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const shippingInfoId = req.params.shippingInfoId || '';

    const dbObj = await putUpdateShippingInfoByme(shippingInfoId, body);

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    if (dbObj.dbStatus === 'Not Found') {
        return returnNotfound(res);
    }

    return returnSuccess(res, dbObj.data);
};

const patchShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const shippingInfoId = req.params.shippingInfoId || '';
    const userId = body.user_id;

    const dbObj = await patchUpdateShippingInfoByme(shippingInfoId, userId, body);

    if (dbObj.dbStatus === 'Error') {
        return returnSystemError(res);
    }

    if (dbObj.dbStatus === 'Not Found') {
        return returnNotfound(res);
    }

    return returnSuccess(res, dbObj.data);
};

const deleteShippingInfoByMe = async (req, res) => {
    const body = req.body;
    const shippingInfoId = req.params.shippingInfoId || '';
    const userId = body.user_id;

    const dbObj = await removeShippingInfoByme(shippingInfoId, userId, body);

    if (dbObj.dbStatus === 'Error') {
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
