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
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';

const regisUser = async (payload = null) => {
    try {
        const user = await User.create(payload);
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.CREATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );
        return dbSuccess(user);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const getAllUser = async () => {
    try {
        const users = await User.findAll({ where: { deleted_at: null } });
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            users.map((item) => {
                return item.toJSON();
            }),
        );
        return dbSuccess(users);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const loginUser = async (payload = null) => {
    try {
        const user = await User.findOne({ where: { email: payload.email } });

        if (!user) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );

        if (!user.verify_at || user.verify_at === '') {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.CHECK_STATUS,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_VERIFY,
            );
            return dbEmailNotVerify();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.CHECK_STATUS,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
        );

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
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
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

        if (!user) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );

        return dbSuccess(user);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const updateUser = async (findCondition, payload) => {
    try {
        let user = await User.findOne({ where: findCondition });
        if (!user) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );
        user.set(payload);
        await user.save();
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.UPDATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );
        user = user.toJSON();
        delete user.password;
        return dbSuccess(user);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
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
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            user.toJSON(),
        );

        const userProfileCount = await UserInfo.count({
            where: {
                user_id: userId,
            },
        });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER_INFO.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
        );

        if (userProfileCount) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER_INFO.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.CONFLICT,
            );
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

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER_INFO.CREATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            userProfile.toJSON(),
        );

        return dbCreated(userProfile);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
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
        if (!userInfo) {
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.USER_INFO.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.NOT_FOUND,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER_INFO.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            userInfo.toJSON(),
        );

        userInfo.set(payload);

        await userInfo.save();

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.USER_INFO.UPDATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            userInfo.toJSON(),
        );

        return dbSuccess(userInfo);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

export { getAllUser, regisUser, loginUser, findUser, updateUser, createUserProfile, updateUserProfile };
