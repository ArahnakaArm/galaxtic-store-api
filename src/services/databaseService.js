import { User } from '../models/index.js';

const regisUser = async (payload = null) => {
    try {
        const user = await User.create(payload);
        return user;
    } catch (e) {
        return null;
    }
};

const findUser = async (payload = null, additionalProp = null) => {
    try {
        let itemAtts = ['email', 'user_id', 'user_role', 'first_name', 'last_name', 'is_active'];
        if (additionalProp) itemAtts = [...itemAtts, ...additionalProp];

        const user = await User.findOne({
            where: payload,
            attributes: itemAtts,
        });
        if (user) return user;
        else return null;
    } catch (e) {
        return null;
    }
};

export { regisUser, findUser };
