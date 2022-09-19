import jwt from 'jsonwebtoken';
import configApp from '../../../conf/config-app.js';
import { User } from '../../models/index.js';
import { regisUser, findUser } from '../databaseServices/userDatabaseService.js';
import { returnUnauthorized } from '../handlerResponse.js';
const { JWT_EXPIRE, JWT_SECRET } = configApp;

const auth = async (req, res, next) => {
    try {
        const headers = req.headers;
        const token = headers.authorization.split('Bearer ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({ where: { user_id: decoded.user_id, deleted_at: null } });
        req.body.user_id = decoded.user_id;
        if (!user) return returnUnauthorized(res);
    } catch (err) {
        return returnUnauthorized(res);
    }
    next();
};

const adminRoleValidate = async (req, res, next) => {
    try {
        const headers = req.headers;
        const token = headers.authorization.split('Bearer ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({ where: { user_id: decoded.user_id, deleted_at: null } });
        if (user.user_role !== 'ADMIN') return returnUnauthorized(res);
    } catch (err) {
        return returnUnauthorized(res);
    }

    next();
};

const userRoleValidate = async (req, res, next) => {
    try {
        const headers = req.headers;
        const token = headers.authorization.split('Bearer ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({ where: { user_id: decoded.user_id, deleted_at: null } });

        if (user.user_role !== 'USER' && user.user_role !== 'ADMIN') return returnUnauthorized(res);
    } catch (err) {
        return returnUnauthorized(res);
    }

    next();
};

export { auth, adminRoleValidate, userRoleValidate };
