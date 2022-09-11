import { User, Shop } from '../../models/index.js';
import { generateUuid } from '../basicFunc.js';
import { dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';

const getShopsByMe = async (userId) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: userId,
            },
        });

        if (!user) return dbNotFound();
        const shops = await user.getShops();

        return dbSuccess(shops);
    } catch (e) {
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

        if (!user) return dbNotFound();

        const shopId = generateUuid();

        const shop = await Shop.create({
            shop_id: shopId,
            shop_name: payload.shop_name,
        });

        await user.addShops(shop);

        return dbCreated(shop);
    } catch (e) {
        return dbSysError();
    }
};

const updateShopByMe = async (userId, shopId, payload) => {
    try {
        const shop = await Shop.findOne({
            where: { shop_id: shopId },
            include: [{ model: User, where: { user_id: userId } }],
        });
        if (!shop) return dbNotFound();

        const updateObj = {
            updated_at: new Date(),
            ...payload,
        };

        shop.set(updateObj);

        await shop.save();
        return dbSuccess(shop);
    } catch (e) {
        return dbSysError();
    }
};

const removeShopByMe = async (userId, shopId) => {
    try {
        const shop = await Shop.findOne({
            where: { shop_id: shopId },
            include: [{ model: User, where: { user_id: userId } }],
        });
        if (!shop) return dbNotFound();

        await Shop.destroy({ where: { shop_id: shopId } });

        return dbSuccess();
    } catch (e) {
        return dbSysError();
    }
};

export { getShopsByMe, createShopByMe, updateShopByMe, removeShopByMe };
