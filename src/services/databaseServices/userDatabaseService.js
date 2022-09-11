import { User, UserInfo, ShippingInfo, Shop, sequelize } from '../../models/index.js';
import { dbConflict, dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';
import { generateUuid } from '../basicFunc.js';

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
        return null;
    }
};

const createUserProfile = async (payload) => {
    try {
        const userId = payload.user_id;
        const user = await User.findOne({
            where: {
                user_id: userId,
            },
        });

        if (!user) {
            return dbNotFound();
        }

        const userProfileCount = await UserInfo.count({
            where: {
                user_id: userId,
            },
        });
        if (userProfileCount) {
            return dbConflict();
        }

        const userInfoId = generateUuid();

        const userProfile = await UserInfo.create({
            user_info_id: userInfoId,
            user_id: userId,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
        });
        return dbCreated(userProfile);
    } catch (e) {
        console.log(e);
        return dbSysError();
    }
};

const updateUserProfile = async (payload) => {
    try {
        const userId = payload.user_id;
        const userInfo = await UserInfo.findOne({
            where: {
                user_id: userId,
            },
        });
        if (!userInfo) return dbNotFound();

        userInfo.set({
            first_name: payload.first_name || '',
            last_name: payload.last_name || '',
            tel_number: payload.tel_number || null,
            address: payload.address || null,
            profile_image: payload.profile_image ? payload.profile_image : null,
        });

        await userInfo.save();

        return dbSuccess(userInfo);
    } catch (e) {
        return dbSysError();
    }
};

export { regisUser, findUser, commonUpdate, commonPost, createUserProfile, updateUserProfile };
