import { ShippingInfo } from '../../models/index.js';
import { generateUuid } from '../basicFunc.js';
import { dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';

const findAllShippingInfoByMe = async (userId) => {
    try {
        const shippingInfos = await ShippingInfo.findAll({ where: { user_id: userId } });
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shippingInfos.map((item) => {
                return item.toJSON();
            }),
        );
        return dbSuccess(shippingInfos);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const findByIdShippingInfoByMe = async (id, userId) => {
    try {
        const shippingInfos = await ShippingInfo.findOne({ where: { shipping_info_id: id, user_id: userId } });

        if (!shippingInfos) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.SHIPPING.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shippingInfos.toJSON(),
        );
        return dbSuccess(shippingInfos);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const createShippingInfoByMe = async (userId, payload) => {
    delete payload.user_id;
    try {
        const createData = {
            shipping_info_id: generateUuid(),
            user_id: userId,
            ...payload,
        };

        const postShippingInfoByMe = await ShippingInfo.create(createData);
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.CRAETE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            postShippingInfoByMe.toJSON(),
        );
        return dbCreated(postShippingInfoByMe);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const putUpdateShippingInfoByme = async (id, payload) => {
    try {
        const updateData = payload;

        await ShippingInfo.update(updateData, {
            where: {
                user_id: payload.user_id,
                shipping_info_id: id,
            },
        });

        const shippingInfo = await ShippingInfo.findOne({ where: { user_id: payload.user_id, shipping_info_id: id } });

        if (!shippingInfo) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.SHIPPING.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shippingInfo.toJSON(),
        );
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.UPDATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shippingInfo.toJSON(),
        );

        return dbSuccess(shippingInfo);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const patchUpdateShippingInfoByme = async (id, userId, payload) => {
    try {
        const updateData = payload;

        const shippingInfo = await ShippingInfo.findOne({ where: { shipping_info_id: id, user_id: userId } });

        if (!shippingInfo) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.SHIPPING.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shippingInfo.toJSON(),
        );

        shippingInfo.set(updateData);

        await shippingInfo.save();

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.UPDATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            shippingInfo.toJSON(),
        );

        return dbSuccess(shippingInfo);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const removeShippingInfoByme = async (userId, shippingId) => {
    try {
        await ShippingInfo.destroy({ where: { shipping_info_id: shippingId } });
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.SHIPPING.DELETE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            { user_id: userId, shipping_info_id: shippingId },
        );

        return dbSuccess();
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

export {
    findAllShippingInfoByMe,
    findByIdShippingInfoByMe,
    createShippingInfoByMe,
    putUpdateShippingInfoByme,
    patchUpdateShippingInfoByme,
    removeShippingInfoByme,
};
