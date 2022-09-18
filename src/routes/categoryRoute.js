import express from 'express';
import { auth, userRoleValidate } from '../services/middleware/auth.js';
import { postMainCategoryValidate } from '../services/validate/categoryValidator.js';
import path from '../utils/enum/path.js';
import { getAllMainCategory } from '../controllers/categoryController.js';
import incommingLog from '../services/middleware/incommingLog.js';

const CategoryRoute = express.Router();

const { CATEGORY } = path;

CategoryRoute.get(CATEGORY.MAIN_CATEGORY, [incommingLog], getAllMainCategory);

export default CategoryRoute;
