import { User } from '../models/index.js';
import {
  returnSuccess,
  returnCreated,
  returnSystemError,
  returnConflict,
  returnNotfound,
  returnWrongPass,
} from '../services/handlerResponse.js';
import { regisUser, findUser } from '../services/databaseService.js';
import { generateUuid, hashPassword, matchPassword } from '../services/basicFunc.js';
import jwt from 'jsonwebtoken';
import configApp from '../../conf/config-app.js';
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
    const userPayload = {
      email: body.email,
      password: hashedPassword,
      user_id: userId,
      user_role: body.user_role,
      first_name: body.first_name,
      last_name: body.last_name,
      is_active: 't',
    };
    const user = await regisUser(userPayload);
    return returnCreated(res, user);
  } catch (error) {
    return returnSystemError(res);
  }
};

const login = async (req, res) => {
  try {
    const body = req.body;
    const user = await findUser({ email: body.email, deleted_at: null });

    if (!user) return returnNotfound(res);

    const password = body.password;

    const match = await matchPassword(password, user.password);

    if (!match) return returnWrongPass(res);

    const token = jwt.sign(
      {
        user_id: user.user_id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
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

export { getUsers, register, login, profile };
