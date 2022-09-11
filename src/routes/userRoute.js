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

UserRoute.get(USER.GET_USER, [auth], getUsers);
UserRoute.post(USER.REGISTER, [registerValidate], register);
UserRoute.post(USER.LOGIN, [loginValidate], login);
UserRoute.post(USER.VERIFY_EMAIL, [verifyEmailValidate], verifyEmail);
UserRoute.get(USER.PROFILE, [auth, userRoleValidate], profile);
UserRoute.post(USER.FORGOT_PASSWORD, [forgotPasswordValidate], forgotPassword);
UserRoute.patch(
    USER.CHANGE_PASSWORD_WITH_VERIFYCODE,
    [changePasswordWithVerifyCodeValidate],
    changePasswordWithVerifyCode,
);
UserRoute.post(USER.PROFILE, [auth, userRoleValidate], createProfile);
UserRoute.patch(USER.PROFILE, [auth, userRoleValidate], updateProfile);
export default UserRoute;
