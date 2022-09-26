import { User, Shop } from '../../models/index.js';
import { generateUuid } from '../basicFunc.js';
import { dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';

const getShopsByMe = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: userId,
            },
        });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );

        if (!user) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        const shops = await user.getShops();

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHOP.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shops.map((item) => {
                return item.toJSON();
            }),
        );

        return dbSuccess(shops);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const createShopByMe = async (userId, payload) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: userId,
            },
        });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );

        if (!user) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        const shopId = generateUuid();

        const shop = await Shop.create({
            shop_id: shopId,
            shop_name: payload.shop_name,
        });

        await user.addShops(shop);

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHOP.CRAETE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shop.toJSON(),
        );

        return dbCreated(shop);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const updateShopByMe = async (userId, shopId, payload) => {
    try {
        const shop = await Shop.findOne({
            where: { shop_id: shopId },
            include: [{ model: User, where: { user_id: userId } }],
        });

        if (!shop) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.SHOP.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHOP.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shop.toJSON(),
        );

        const updateObj = {
            updated_at: new Date(),
            ...payload,
        };

        shop.set(updateObj);

        await shop.save();

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHOP.UPDATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shop.toJSON(),
        );

        return dbSuccess(shop);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const removeShopByMe = async (userId, shopId) => {
    try {
        const shop = await Shop.findOne({
            where: { shop_id: shopId },
            include: [{ model: User, where: { user_id: userId } }],
        });
        if (!shop) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.SHOP.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        await Shop.destroy({ where: { shop_id: shopId } });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHOP.DELETE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            { shop_id: shopId },
        );
        return dbSuccess();
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

export { getShopsByMe, createShopByMe, updateShopByMe, removeShopByMe };
