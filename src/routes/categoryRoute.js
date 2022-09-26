import express from 'express';
import { auth, userRoleValidate } from '../services/middleware/auth.js';
import { postMainCategoryValidate } from '../services/validate/categoryValidator.js';
import path from '../utils/enum/path.js';
import {
    getAllMainCategory,
    getByIdMainCategory,
    postMainCategory,
    patchMainCategory,
    deleteMainCategory,
} from '../controllers/categoryController.js';
import incommingLog from '../services/middleware/incommingLog.js';

const CategoryRoute = express.Router();

const { CATEGORY } = path;

CategoryRoute.get(CATEGORY.MAIN_CATEGORY, [incommingLog], getAllMainCategory);
CategoryRoute.get(CATEGORY.MAIN_CATEGORY_BY_ID, [incommingLog], getByIdMainCategory);

CategoryRoute.post(
    CATEGORY.MAIN_CATEGORY,
    [incommingLog, auth, userRoleValidate, postMainCategoryValidate],
    postMainCategory,
);

CategoryRoute.patch(CATEGORY.UPDATE_CATEGORY, [incommingLog], patchMainCategory);

CategoryRoute.delete(CATEGORY.DELETE_CATEGORY, [incommingLog], deleteMainCategory);

export default CategoryRoute;
