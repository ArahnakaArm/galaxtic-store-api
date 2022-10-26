import { MainCategory, Product, Shop, UserShop } from '../../models/index.js';
import { dbSuccess, dbSysError, dbNotFound, dbCreated, dbConflict } from '../handlerDatabaseServiceResponse.js';
import { Op } from 'sequelize';
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';
import { generateUuid } from '../basicFunc.js';

const findProduct = async (options) => {
    try {
        const searchCondition = {};

        if (options.search) {
            searchCondition.main_category_name = { [Op.like]: `%${options.search}%` };
        }

        if (options.isActive) {
            searchCondition.is_active = options.isActive;
        }

        const products = await Product.findAll({
            include: [MainCategory, Shop],
            where: searchCondition,
            limit: options.limit,
            offset: options.offset,
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['created_at', 'DESC'],
            ],
        });

        const productsCount = await Product.count({ where: searchCondition });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.PRODUCT.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            products.map((item) => {
                return item.toJSON();
            }),
        );

        return dbSuccess({ info: products, count: productsCount });
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const findProductById = async (productId) => {
    try {
        const product = await Product.findOne({ where: { product_id: productId } });
        if (!product) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.PRODUCT.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.PRODUCT.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            product.toJSON(),
        );

        return dbSuccess(product);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const createProduct = async (payload, userId) => {
    try {
        const shopId = payload.shop_id;
        const cateId = payload.main_category_id;

        const userShop = await UserShop.findOne({ where: { shop_id: shopId, user_id: userId } });

        if (!userShop) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER_SHOP.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        const mainCate = await MainCategory.findOne({ where: { main_category_id: cateId } });
        if (!mainCate) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.MAIN_CATEGORY.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        const createData = {
            product_id: generateUuid(),
            ...payload,
            is_active: true,
        };

        const product = await Product.create(createData);
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MAIN_CATEGORY.CREATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            product.toJSON(),
        );
        return dbCreated(product);
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

export { findProduct, findProductById, createProduct, updateMainCategory, removeMainCategory };
