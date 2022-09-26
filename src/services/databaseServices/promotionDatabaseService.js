import { User, Shop } from '../../models/index.js';
import { generateUuid } from '../basicFunc.js';
import { MonthlyPromotion, MonthlyPromotionContent, sequelize } from '../../models/index.js';
import { dbCreated, dbNotFound, dbSuccess, dbSysError } from '../handlerDatabaseServiceResponse.js';
import { verboseDBLogs } from '../logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';

const getMonthlyPromotion = async () => {
    try {
        const monthlyPromotions = await MonthlyPromotion.findAll({
            include: {
                model: MonthlyPromotionContent,
                as: 'monthly_promotion_contents',
            },
            order: [['created_at', 'DESC']],
        });

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MONTHLY_PROMOTION.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            monthlyPromotions.map((item) => {
                return item.toJSON();
            }),
        );
        return dbSuccess(monthlyPromotions);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
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
            verboseDBLogs(
                LOG_SERVICES.DB.CMD.MONTHLY_PROMOTION.FIND,
                LOG_SERVICES.DB.STATUS.FAILED,
                LOG_SERVICES.DB.MESSAGE.CONFLICT,
            );
            return dbNotFound();
        }

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MONTHLY_PROMOTION.FIND,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            monthlyPromotions.toJSON(),
        );

        return dbSuccess(monthlyPromotions);
    } catch (e) {
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
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

        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MONTHLY_PROMOTION.CREATE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            postMonthlyPromotion.toJSON(),
        );

        return dbCreated(postMonthlyPromotion);
    } catch (e) {
        await t.rollback();
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

const removeMonthlyPromotion = async (promotionId) => {
    const t = await sequelize.transaction();
    try {
        await MonthlyPromotion.destroy({ where: { monthly_promotion_id: promotionId } }, { transaction: t });

        await MonthlyPromotionContent.destroy({ where: { monthly_promotion_id: promotionId } }, { transaction: t });

        await t.commit();
        verboseDBLogs(
            LOG_SERVICES.DB.CMD.MONTHLY_PROMOTION.DELETE,
            LOG_SERVICES.DB.STATUS.SUCCESS,
            LOG_SERVICES.DB.MESSAGE.SUCCESS,
            { monthly_promotion_id: promotionId },
        );
        return dbSuccess();
    } catch (e) {
        await t.rollback();
        verboseDBLogs(LOG_SERVICES.DB.CMD.COMMON.SYSTEM, LOG_SERVICES.DB.STATUS.FAILED, LOG_SERVICES.DB.MESSAGE.ERROR);
        return dbSysError();
    }
};

export { getMonthlyPromotion, getMonthlyPromotionById, createMonthlyPromotion, removeMonthlyPromotion };
