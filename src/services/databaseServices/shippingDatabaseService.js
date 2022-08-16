import { User, ShippingInfo } from '../../models/index.js';
import { generateUuid } from '../basicFunc.js';
import { dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';

const findAllShippingInfoByMe = async (userId) => {
    try {
        const shippingInfos = await ShippingInfo.findAll({ where: { user_id: userId } });

        return dbSuccess(shippingInfos);
    } catch (e) {
        return dbSysError();
    }
};

const findByIdShippingInfoByMe = async (id, userId) => {
    try {
        const shippingInfos = await ShippingInfo.findOne({ where: { shipping_info_id: id, user_id: userId } });

        if (!shippingInfos) {
            return dbNotFound();
        }

        return dbSuccess(shippingInfos);
    } catch (e) {
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

        return dbCreated(postShippingInfoByMe);
    } catch (e) {
        return dbSysError();
    }
};

const putUpdateShippingInfoByme = async (id, payload) => {
    delete payload.user_id;
    try {
        const updateData = payload;

        await ShippingInfo.update(updateData, {
            where: {
                shipping_info_id: id,
            },
        });

        const shippingInfo = await ShippingInfo.findOne({ where: { shipping_info_id: id } });

        if (!shippingInfo) {
            return dbNotFound();
        }

        return dbSuccess(shippingInfo);
    } catch (e) {
        return dbSysError();
    }
};

const patchUpdateShippingInfoByme = async (id, userId, payload) => {
    delete payload.user_id;
    try {
        const updateData = payload;

        const shippingInfo = await ShippingInfo.findOne({ where: { shipping_info_id: id, user_id: userId } });

        if (!shippingInfo) {
            return dbNotFound();
        }

        shippingInfo.set(updateData);

        await shippingInfo.save();

        return dbSuccess(shippingInfo);
    } catch (e) {
        return dbSysError();
    }
};

const removeShippingInfoByme = async (id) => {
    try {
        await ShippingInfo.destroy({ where: { shipping_info_id: id } });

        return dbSuccess();
    } catch (e) {
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
