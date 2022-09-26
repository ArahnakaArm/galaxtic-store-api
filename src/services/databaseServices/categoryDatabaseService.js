import { MainCategory } from '../../models/index.js';
import { dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';
import { Op } from 'sequelize';
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';

const getMainCategorie = async (options) => {
    try {
        const searchCondition = {};

        if (options.search) {
            searchCondition.main_category_name = { [Op.like]: `%${options.search}%` };
        }

        const categories = await MainCategory.findAll({
            where: searchCondition,
            limit: options.limit,
            offset: options.offset,
        });

        const categoriesCount = await MainCategory.count({ where: searchCondition });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            categories.map((item) => {
                return item.toJSON();
            }),
        );

        return dbSuccess({ info: categories, count: categoriesCount });
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

export { getMainCategorie };
