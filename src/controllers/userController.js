import {
    returnSuccess,
    returnCreated,
    returnSystemError,
    returnConflict,
    returnNotfound,
    returnWrongPass,
    returnEmailNotVerify,
} from '../services/handlerResponse.js';
import {
    getAllUser,
    regisUser,
    loginUser,
    findUser,
    updateUser,
    createUserProfile,
    updateUserProfile,
} from '../services/databaseServices/userDatabaseService.js';
import { generateUuid, hashPassword, generateRandomString } from '../services/basicFunc.js';
import { sendEmail, sendEmailChangePass } from '../services/sendEmail.js';
import dbStatus from '../utils/enum/dbStatus.js';

const getUsers = async (req, res) => {
    const dbObj = await getAllUser();

    switch (dbObj.dbStatus) {
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const register = async (req, res) => {
    try {
        const body = req.body;
        const userId = generateUuid();
        const dbObjExitedUser = await findUser({ email: body.email, deleted_at: null });

        if (dbObjExitedUser.data) return returnConflict(res);

        const hashedPassword = await hashPassword(body.password);
        const verifyCode = generateRandomString(16);
        const userPayload = {
            email: body.email,
            password: hashedPassword,
            user_id: userId,
            user_role: body.user_role,
            first_name: body.first_name,
            last_name: body.last_name,
            is_active: 't',
            verify_code: verifyCode,
        };

        const dbObj = await regisUser(userPayload);

        switch (dbObj.dbStatus) {
            case dbStatus.CONFLICT:
                return returnConflict(res);
            case dbStatus.SYS_ERROR:
                return returnSystemError(res);
        }

        sendEmail(body.email, verifyCode);

        return returnCreated(res, dbObj.data);
    } catch (error) {
        return returnSystemError(res);
    }
};

const login = async (req, res) => {
    const body = req.body;
    const dbObj = await loginUser(body);

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
        case dbStatus.EMAIL_NOT_VERIFY:
            return returnEmailNotVerify(res);
        case dbStatus.WRONG_PASS:
            return returnWrongPass(res);
    }

    return returnSuccess(res, dbObj.data);
};
const profile = async (req, res) => {
    try {
        const body = req.body;
        const userId = body.user_id;

        const dbObj = await findUser({ user_id: userId, deleted_at: null });

        switch (dbObj.dbStatus) {
            case dbStatus.NOT_FOUND:
                return returnNotfound(res);
            case dbStatus.SYS_ERROR:
                return returnSystemError(res);
            case dbStatus.EMAIL_NOT_VERIFY:
                return returnEmailNotVerify(res);
            case dbStatus.WRONG_PASS:
                return returnWrongPass(res);
        }

        return returnSuccess(res, dbObj.data);
    } catch (e) {
        return returnSystemError(res);
    }
};

const verifyEmail = async (req, res) => {
    try {
        const verifyCode = req.body.verify_code || '';
        if (verifyCode === '') return returnSystemError(res);

        const now = new Date();
        const dbObj = await updateUser(
            { verify_code: verifyCode, deleted_at: null },
            { updated_at: now, verify_at: now },
        );

        switch (dbObj.dbStatus) {
            case dbStatus.NOT_FOUND:
                return returnNotfound(res);
            case dbStatus.SYS_ERROR:
                return returnSystemError(res);
        }

        return returnSuccess(res, dbObj.data);
    } catch (e) {
        return returnSystemError(res);
    }
};

const forgotPassword = async (req, res) => {
    const { body } = req;
    const verifyCode = generateRandomString(16);

    const now = new Date();
    const dbObj = await updateUser(
        { email: body.email, deleted_at: null },
        { updated_at: now, verify_code_password: verifyCode },
    );

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    sendEmailChangePass(body.email, verifyCode);

    return returnSuccess(res, dbObj.data);
};

const changePasswordWithVerifyCode = async (req, res) => {
    const { body } = req;
    const password = body.password;
    const verify_code_password = body.verify_code_password;

    const hashedPassword = await hashPassword(password);

    const now = new Date();
    const dbObj = await updateUser(
        { verify_code_password: verify_code_password, deleted_at: null },
        { updated_at: now, password: hashedPassword },
    );

    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }

    return returnSuccess(res, dbObj.data);
};

const createProfile = async (req, res) => {
    const { body } = req;
    const dbObj = await createUserProfile(body);
    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }
    return returnCreated(res, dbObj.data);
};

const updateProfile = async (req, res) => {
    const { body } = req;
    const dbObj = await updateUserProfile(body);
    switch (dbObj.dbStatus) {
        case dbStatus.NOT_FOUND:
            return returnNotfound(res);
        case dbStatus.CONFLICT:
            return returnConflict(res);
        case dbStatus.SYS_ERROR:
            return returnSystemError(res);
    }
    return returnSuccess(res, dbObj.data);
};

export {
    getUsers,
    register,
    login,
    profile,
    verifyEmail,
    forgotPassword,
    changePasswordWithVerifyCode,
    createProfile,
    updateProfile,
};
