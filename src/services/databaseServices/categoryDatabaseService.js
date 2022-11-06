import { MainCategory } from '../../models/index.js';
import { dbSuccess, dbSysError, dbNotFound, dbCreated, dbConflict } from '../handlerDatabaseServiceResponse.js';
import { Op } from 'sequelize';
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';
import { generateUuid } from '../basicFunc.js';

const findMainCategorie = async (options) => {
    try {
        const searchCondition = {};

        if (options.search) {
            searchCondition.main_category_name = { [Op.like]: `%${options.search}%` };
        }

        if (options.isActive) {
            searchCondition.is_active = options.isActive;
        }

        const categories = await MainCategory.findAll({
            where: searchCondition,
            limit: options.limit,
            offset: options.offset,
        });

        const categoriesCount = await MainCategory.count({ where: searchCondition });
        //eie
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

const findMainCategoryById = async (mainCateId) => {
    try {
        const category = await MainCategory.findOne({ where: { main_category_id: mainCateId } });
        if (!category) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            category.toJSON(),
        );

        return dbSuccess(category);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const createMainCategory = async (payload) => {
    try {
        const existedCateName = payload.main_category_name;

        const existedCateCount = await MainCategory.count({
            where: { main_category_name: existedCateName, is_active: true },
        });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
        );

        if (existedCateCount) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.CONFLICT,
            );
            return dbConflict();
        }

        const createData = {
            main_category_id: generateUuid(),
            ...payload,
            is_active: true,
        };

        const mainCate = await MainCategory.create(createData);
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.CREATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            mainCate.toJSON(),
        );
        return dbCreated(mainCate);
    } catch (e) {
        console.log(e);
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const updateMainCategory = async (mainCategoryId, payload) => {
    try {
        const category = await MainCategory.findOne({ where: { main_category_id: mainCategoryId } });
        if (!category) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            category.toJSON(),
        );

        category.set(payload);

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.UPDATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            category.toJSON(),
        );

        await category.save();

        return dbSuccess(category);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const removeMainCategory = async (mainCateId) => {
    try {
        await MainCategory.destroy({ where: { main_category_id: mainCateId } });
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.DELETE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            { main_category_id: mainCateId },
        );

        return dbSuccess();
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

export { findMainCategorie, findMainCategoryById, createMainCategory, updateMainCategory, removeMainCategory };
