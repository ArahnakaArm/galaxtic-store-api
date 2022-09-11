import {
    getShopsByMe,
    createShopByMe,
    updateShopByMe,
    removeShopByMe,
} from '../services/databaseServices/shopDatabaseService.js';
import dbStatus from '../utils/enum/dbStatus.js';
import {
    returnSystemError,
    returnConflict,
    returnNotfound,
    returnCreated,
    returnSuccess,
} from '../services/handlerResponse.js';

const getAllShop = async (req, res) => {
    const { body } = req;
    const userId = body.user_id;

    const dbObj = await getShopsByMe(userId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postShop = async (req, res) => {
    const { body } = req;
    const userId = body.user_id;

    const dbObj = await createShopByMe(userId, body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnCreated(res, dbObj.data);
};

const patchShop = async (req, res) => {
    const { body } = req;
    const shopId = req.params.shopId || '';
    const userId = body.user_id || '';

    const dbObj = await updateShopByMe(userId, shopId, body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const deleteShop = async (req, res) => {
    const { body } = req;
    const shopId = req.params.shopId || '';
    const userId = body.user_id || '';

    const dbObj = await removeShopByMe(userId, shopId);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

export { getAllShop, postShop, patchShop, deleteShop };
