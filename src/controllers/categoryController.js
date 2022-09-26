import {
    findMainCategorie,
    findMainCategoryById,
    createMainCategory,
    updateMainCategory,
    removeMainCategory,
} from '../services/databaseServices/categoryDatabaseService.js';
import {
    returnConflict,
    returnCreated,
    returnNotfound,
    returnSuccess,
    returnSystemError,
} from '../services/handlerResponse.js';
import dbStatus from '../utils/enum/dbStatus.js';
import { manageCommonQuery } from '../services/basicFunc.js';
const getAllMainCategory = async (req, res) => {
    const options = manageCommonQuery(req.query);
    const dbObj = await findMainCategorie(options);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data.info, dbObj.data.count);
};

const getByIdMainCategory = async (req, res) => {
    const mainCategoryId = req.params.mainCategoryId || '';
    const dbObj = await findMainCategoryById(mainCategoryId);
    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const postMainCategory = async (req, res) => {
    const body = req.body;
    const dbObj = await createMainCategory(body);

    switch (dbObj.dbStatus) {
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnCreated(res, dbObj.data);
};

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
};

export { getAllMainCategory, getByIdMainCategory, postMainCategory, patchMainCategory, deleteMainCategory };
