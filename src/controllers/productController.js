import { findProduct, findProductById, createProduct } from '../services/databaseServices/productDatabaseService.js';
import {
    returnConflict,
    returnCreated,
    returnNotfound,
    returnSuccess,
    returnSystemError,
} from '../services/handlerResponse.js';
import dbStatus from '../utils/enum/dbStatus.js';
import { manageCommonQuery } from '../services/basicFunc.js';
const getAllProduct = async (req, res) => {
    const options = manageCommonQuery(req.query);
    const dbObj = await findProduct(options);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data.info, dbObj.data.count);
};

const getByIdProduct = async (req, res) => {
    const productId = req.params.productId || '';
    const dbObj = await findProductById(productId);
    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postProduct = async (req, res) => {
    const body = req.body;
    const userId = body.user_id || '';

    const dbObj = await createProduct(body, userId);
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
/*
const patchMainCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId || '';
    const body = req.body;

    const dbObj = await updateMainCategory(mainCategoryId, body);
    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const deleteMainCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId || '';

    const dbObj = await removeMainCategory(mainCategoryId);
    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res);
}; */

export { getAllProduct, getByIdProduct, postProduct };
