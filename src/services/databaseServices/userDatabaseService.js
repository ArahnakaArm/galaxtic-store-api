import { User, UserInfo, ShippingInfo, Shop } from '../../models/index.js';

const regisUser = async (payload = null) => {
    try {
        const user = await User.create(payload);
        return user;
    } catch (e) {
        return null;
    }
};

const findUser = async (payload = null, additionalProp = null) => {
    try {
        let itemAtts = ['user_id', 'email', 'user_role', 'first_name', 'last_name', 'is_active'];
        if (additionalProp) itemAtts = [...itemAtts, ...additionalProp];

        const user = await User.findOne({
            include: [Shop, UserInfo, ShippingInfo],
            where: payload,
            attributes: itemAtts,
        });
        if (user) return user;
        else return null;
    } catch (e) {
        return null;
    }
};

const commonUpdate = async (obj, payload) => {
    try {
        const now = new Date();
        const updateObj = { ...payload, updated_at: now };
        obj.set(updateObj);
        await obj.save();
        return obj;
    } catch (e) {
        return null;
    }
};

const commonPost = async (obj, payload) => {
    try {
        const postObj = await obj.create({
            ...payload,
        });

        return postObj;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export { regisUser, findUser, commonUpdate, commonPost };
