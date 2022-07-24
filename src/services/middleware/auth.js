import jwt from 'jsonwebtoken';
import configApp from '../../../conf/config-app.js';
import { regisUser, findUser } from '../../services/databaseService.js';
import { returnUnauthorized } from '../handlerResponse.js';
const { JWT_EXPIRE, JWT_SECRET } = configApp;

const auth = async (req, res, next) => {
  try {
    const headers = req.headers;
    const token = headers.authorization.split('Bearer ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await findUser({ user_id: decoded.user_id, deleted_at: null });
    req.body.user_id = decoded.user_id;
    if (!user) return returnUnauthorized(res);
  } catch (err) {
    return returnUnauthorized(res);
  }
  next();
};

export { auth };
