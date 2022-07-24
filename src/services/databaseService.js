import { User } from '../models/index.js';

const regisUser = async (payload = null) => {
  try {
    const user = await User.create(payload);
    return user;
  } catch (e) {
    return null;
  }
};

const findUser = async (payload = null) => {
  try {
    const user = await User.findOne({ where: payload });
    if (user) return user;
    else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { regisUser, findUser };
