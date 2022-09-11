import { User, Shop } from '../../models/index.js';
import { generateUuid } from '../basicFunc.js';
import { MonthlyPromotion, MonthlyPromotionContent, sequelize } from '../../models/index.js';
import { dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';

const getMonthlyPromotion = async () => {
    try {
        const monthlyPromotions = await MonthlyPromotion.findAll({
            include: {
                model: MonthlyPromotionContent,
                as: 'monthly_promotion_contents',
            },
            order: [['created_at', 'DESC']],
        });
        return dbSuccess(monthlyPromotions);
    } catch (e) {
        return dbSysError();
    }
};

const getMonthlyPromotionById = async (id) => {
    try {
        const monthlyPromotions = await MonthlyPromotion.findOne({
            where: {
                monthly_promotion_id: id,
            },
            include: {
                model: MonthlyPromotionContent,
                as: 'monthly_promotion_contents',
            },
        });

        if (!monthlyPromotions) {
            return dbNotFound();
        }
        return dbSuccess(monthlyPromotions);
    } catch (e) {
        return dbSysError();
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

        return dbCreated(postMonthlyPromotion);
    } catch (e) {
        console.log(e);
        await t.rollback();
        return dbSysError();
    }
};

const removeMonthlyPromotion = async (id) => {
    const t = await sequelize.transaction();
    try {
        await MonthlyPromotion.destroy({ where: { monthly_promotion_id: id } }, { transaction: t });

        await MonthlyPromotionContent.destroy({ where: { monthly_promotion_id: id } }, { transaction: t });

        await t.commit();
        return dbSuccess();
    } catch (e) {
        console.log(e);
        await t.rollback();
        return dbSysError();
    }
};

export { getMonthlyPromotion, getMonthlyPromotionById, createMonthlyPromotion, removeMonthlyPromotion };
