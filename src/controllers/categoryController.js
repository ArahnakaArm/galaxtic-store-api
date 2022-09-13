import { getMainCategorie } from '../services/databaseServices/categoryDatabaseService.js';
import { returnCreated, returnNotfound, returnSuccess, returnSystemError } from '../services/handlerResponse.js';
import dbStatus from '../utils/enum/dbStatus.js';
const getAllMainCategory = async (req, res) => {
    const offset = req.query.offset || null;
    const limit = req.query.limit || null;
    const search = req.query.search || null;

    let options = {};

    options.offset = offset ? offset : 0;
    options.search = search ? search : null;
    if (limit) options.limit = limit;

    const dbObj = await getMainCategorie(options);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data.info, dbObj.data.count);
};

export { getAllMainCategory };
