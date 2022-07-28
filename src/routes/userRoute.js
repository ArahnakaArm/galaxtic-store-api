import express from 'express';
import { getUsers, register, login, profile } from '../controllers/userController.js';
import { auth } from '../services/middleware/auth.js';
import { registerValidate } from '../services/validate/userValidator.js';
const UserRoute = express.Router();

UserRoute.get('/user', getUsers);
UserRoute.post('/register', [registerValidate], register);
UserRoute.post('/login', login);

UserRoute.get('/profile', [auth], profile);

export default UserRoute;
