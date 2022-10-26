import express from 'express';
import { auth, userRoleValidate } from '../services/middleware/auth.js';
import { postProductValidate } from '../services/validate/productValidator.js';
import path from '../utils/enum/path.js';
import { getAllProduct, getByIdProduct, postProduct } from '../controllers/productController.js';
import incommingLog from '../services/middleware/incommingLog.js';

const ProductRoute = express.Router();

const { PRODUCT } = path;

ProductRoute.get(PRODUCT.PRODUCT, [incommingLog], getAllProduct);
ProductRoute.get(PRODUCT.PRODUCT_BY_ID, [incommingLog], getByIdProduct);

ProductRoute.post(PRODUCT.PRODUCT, [incommingLog, auth, userRoleValidate, postProductValidate], postProduct);

export default ProductRoute;
