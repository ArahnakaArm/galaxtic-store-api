import { User, UserInfo, ShippingInfo, Shop, sequelize } from '../../models/index.js';
import {
    dbConflict,
    dbCreated,
    dbNotFound,
    dbSuccess,
    dbSysError,
    dbEmailNotVerify,
    dbWrongPass,
} from '../handlerDatabaseServiceResponse.js';
import { generateUuid, matchPassword } from '../basicFunc.js';
import jwt from 'jsonwebtoken';
import configApp from '../../../conf/config-app.js';
const { JWT_EXPIRE, JWT_SECRET } = configApp;

const regisUser = async (payload = null) => {
    try {
        const user = await User.create(payload);
        return user;
    } catch (e) {
        return null;
    }
};

const getAllUser = async () => {
    try {
        const users = await User.findAll({ where: { deleted_at: null } });
        return dbSuccess(users);
    } catch (e) {
        return dbSysError();
    }
};

const loginUser = async (payload = null) => {
    try {
        const user = await User.findOne({ where: { email: payload.email } });

        if (!user) return dbNotFound();

        if (!user.verify_at || user.verify_at === '') return dbEmailNotVerify();

        const password = payload.password;

        const match = await matchPassword(password, user.password);

        if (!match) return dbWrongPass();

        const token = jwt.sign(
            {
                user_id: user.user_id,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE },
        );

        return dbSuccess({ token: token });
    } catch (e) {
        console.log(e);
        return dbSysError();
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

        if (!user) return dbNotFound();
        return dbSuccess(user);
    } catch (e) {
        return dbSysError();
    }
};

const updateUser = async (findCondition, payload) => {
    try {
        let user = await User.findOne({ where: findCondition });
        if (!user) return dbNotFound();
        user.set(payload);
        await user.save();
        user = user.toJSON();
        delete user.password;
        return dbSuccess(user);
    } catch (e) {
        return dbSysError();
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
        delete payload.user_id;
        const userInfo = await UserInfo.findOne({
            where: {
                user_id: userId,
            },
        });
        if (!userInfo) return dbNotFound();

        userInfo.set(payload);

        await userInfo.save();

        return dbSuccess(userInfo);
    } catch (e) {
        return dbSysError();
    }
};

export {
    getAllUser,
    regisUser,
    loginUser,
    findUser,
    updateUser,
    commonUpdate,
    commonPost,
    createUserProfile,
    updateUserProfile,
};
