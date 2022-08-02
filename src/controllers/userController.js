import { User } from '../models/index.js';
import {
    returnSuccess,
    returnCreated,
    returnSystemError,
    returnConflict,
    returnNotfound,
    returnWrongPass,
    returnEmailNotVerify,
} from '../services/handlerResponse.js';
import { regisUser, findUser, commonUpdate } from '../services/databaseService.js';
import { generateUuid, hashPassword, matchPassword, generateRandomString } from '../services/basicFunc.js';
import jwt from 'jsonwebtoken';
import configApp from '../../conf/config-app.js';
import { sendEmail, sendEmailChangePass } from '../services/sendEmail.js';
const { JWT_EXPIRE, JWT_SECRET } = configApp;

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return returnSuccess(res, users);
    } catch (error) {
        return returnSystemError(res);
    }
};

const register = async (req, res) => {
    try {
        const body = req.body;
        const userId = generateUuid();
        const exitedUser = await findUser({ email: body.email, deleted_at: null });

        if (exitedUser) return returnConflict(res);

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

        const user = await regisUser(userPayload);

        sendEmail(body.email, verifyCode);

        return returnCreated(res, user);
    } catch (error) {
        return returnSystemError(res);
    }
};

const login = async (req, res) => {
    try {
        const body = req.body;
        const user = await findUser({ email: body.email, deleted_at: null }, ['password', 'verify_at']);

        if (!user) return returnNotfound(res);

        if (!user.verify_at || user.verify_at === '') return returnEmailNotVerify(res);

        const password = body.password;

        const match = await matchPassword(password, user.password);

        if (!match) return returnWrongPass(res);

        const token = jwt.sign(
            {
                user_id: user.user_id,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRE },
        );

        return returnSuccess(res, { token: token });
    } catch (error) {
        return returnSystemError(res);
    }
};
const profile = async (req, res) => {
    try {
        const body = req.body;
        const userId = body.user_id;

        const user = await findUser({ user_id: userId, deleted_at: null });

        if (!user) returnNotfound;

        return returnSuccess(res, user);
    } catch (e) {
        return returnSystemError(res);
    }
};

const verifyEmail = async (req, res) => {
    try {
        const verifyCode = req.body.verify_code || '';

        if (verifyCode === '') return returnSystemError(res);

        const user = await findUser({ verify_code: verifyCode });

        if (!user) return returnNotfound(res);

        const now = new Date();

        const updatedUser = await commonUpdate(user, {
            updated_at: now,
            verify_at: now,
        });

        if (!updatedUser) return returnSystemError(res);

        return returnSuccess(res, updatedUser);
    } catch (e) {
        return returnSystemError(res);
    }
};

const forgotPassword = async (req, res) => {
    const { body } = req;
    const user = await findUser({ email: body.email });

    if (!user) return returnNotfound(res);

    const verifyCode = generateRandomString(16);

    const now = new Date();

    const updatedUser = await commonUpdate(user, {
        updated_at: now,
        verify_code_password: verifyCode,
    });

    if (!updatedUser) return returnSystemError(res);

    sendEmailChangePass(body.email, verifyCode);

    return returnSuccess(res);
};

const changePasswordWithVerifyCode = async (req, res) => {
    const { body } = req;
    const password = body.password;
    const verify_code_password = body.verify_code_password;

    const user = await findUser({ verify_code_password: verify_code_password });
    if (!user) return returnNotfound(res);

    const hashedPassword = await hashPassword(password);
    const updatedUser = await commonUpdate(user, { password: hashedPassword });
    if (!updatedUser) return returnSystemError(res);

    return returnSuccess(res, updatedUser);
};

export { getUsers, register, login, profile, verifyEmail, forgotPassword, changePasswordWithVerifyCode };
