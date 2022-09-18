import express from 'express';
import {
    getUsers,
    register,
    login,
    profile,
    verifyEmail,
    forgotPassword,
    changePasswordWithVerifyCode,
    createProfile,
    updateProfile,
} from '../controllers/userController.js';
import { auth, adminRoleValidate, userRoleValidate } from '../services/middleware/auth.js';
import incommingLog from '../services/middleware/incommingLog.js';
import {
    registerValidate,
    loginValidate,
    verifyEmailValidate,
    forgotPasswordValidate,
    changePasswordWithVerifyCodeValidate,
} from '../services/validate/userValidator.js';
import path from '../utils/enum/path.js';
const UserRoute = express.Router();

const { USER } = path;

UserRoute.get(USER.GET_USER, [incommingLog, auth], getUsers);
UserRoute.post(USER.REGISTER, [incommingLog, registerValidate], register);
UserRoute.post(USER.LOGIN, [incommingLog, loginValidate], login);
UserRoute.post(USER.VERIFY_EMAIL, [incommingLog, verifyEmailValidate], verifyEmail);
UserRoute.get(USER.PROFILE, [incommingLog, auth, userRoleValidate], profile);
UserRoute.post(USER.FORGOT_PASSWORD, [incommingLog, forgotPasswordValidate], forgotPassword);
UserRoute.patch(
    USER.CHANGE_PASSWORD_WITH_VERIFYCODE,
    [incommingLog, changePasswordWithVerifyCodeValidate],
    changePasswordWithVerifyCode,
);
UserRoute.post(USER.PROFILE, [incommingLog, auth, userRoleValidate], createProfile);
UserRoute.patch(USER.PROFILE, [incommingLog, auth, userRoleValidate], updateProfile);
export default UserRoute;
