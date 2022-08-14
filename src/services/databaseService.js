import { User } from '../models/index.js';
import { generateUuid } from '../services/basicFunc.js';
import { MonthlyPromotion, MonthlyPromotionContent, sequelize } from '../models/index.js';

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
        let itemAtts = ['user_id', 'email', 'user_role', 'first_name', 'last_name', 'is_active'];
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

const commonUpdate = async (obj, payload) => {
    try {
        const now = new Date();
        const updateObj = { ...payload, updated_at: now };
        obj.set(updateObj);
        await obj.save();
        return obj;
    } catch (e) {
        return null;
    }
};

const commonPost = async (obj, payload) => {
    try {
        const postObj = await obj.create({
            ...payload,
        });

        return postObj;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const createMonthlyPromotion = async (payload) => {
    const t = await sequelize.transaction();
    try {
        const postMonthlyPromotion = await MonthlyPromotion.create(
            {
                monthly_promotion_id: generateUuid(),
                url: payload.url,
                imgae_url: payload.imgae_url,
            },
            { transaction: t },
        );

        const mtlPromotionId = postMonthlyPromotion.monthly_promotion_id || '';

        const contents =
            payload.contents.map((item) => ({
                ...item,
                monthly_promotion_content_id: generateUuid(),
                monthly_promotion_id: mtlPromotionId,
            })) || [];

        const postMonthlyPromotionContent = await MonthlyPromotionContent.bulkCreate(contents, { transaction: t });

        await t.commit();

        return postMonthlyPromotion;
    } catch (e) {
        console.log(e);
        await t.rollback();
        return null;
    }
};

const removeMonthlyPromotion = async (id) => {
    const t = await sequelize.transaction();
    try {
        await MonthlyPromotion.destroy({ where: { monthly_promotion_id: id } }, { transaction: t });

        await MonthlyPromotionContent.destroy({ where: { monthly_promotion_id: id } }, { transaction: t });

        await t.commit();
        return {
            dbStatus: 'success',
            data: null,
        };
    } catch (e) {
        console.log(e);
        await t.rollback();
        return {
            dbStatus: 'error',
            data: null,
        };
    }
};

export { regisUser, findUser, commonUpdate, commonPost, createMonthlyPromotion, removeMonthlyPromotion };
