import { MainCategory } from '../../models/index.js';
import { dbSuccess } from '../handlerDatabaseServiceResponse.js';
import { Op } from 'sequelize';
const getMainCategorie = async (options) => {
    const searchCondition = {};

    if (options.search) {
        searchCondition.main_category_name = { [Op.like]: `%${options.search}%` };
    }

    const categories = await MainCategory.findAll({
        where: searchCondition,
        limit: options.limit,
        offset: options.offset,
    });

    const categoriesCount = await MainCategory.count({ where: searchCondition });

    return dbSuccess({ info: categories, count: categoriesCount });
};

export { getMainCategorie };
