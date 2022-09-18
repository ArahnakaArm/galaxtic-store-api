import express from 'express';
import { getAllShop, postShop, patchShop, deleteShop } from '../controllers/shopController.js';
import path from '../utils/enum/path.js';
import { auth, userRoleValidate } from '../services/middleware/auth.js';
import { postShopBymeValidate } from '../services/validate/shopValidator.js';
import incommingLog from '../services/middleware/incommingLog.js';

const ShopRoute = express.Router();

const { SHOP } = path;

ShopRoute.get(SHOP.ADD_SHOP, [incommingLog, auth, userRoleValidate], getAllShop);
ShopRoute.post(SHOP.ADD_SHOP, [incommingLog, auth, userRoleValidate, postShopBymeValidate], postShop);
ShopRoute.patch(SHOP.UPDATE_SHOP, [incommingLog, auth, userRoleValidate], patchShop);
ShopRoute.delete(SHOP.DELETE_SHOP, [incommingLog, userRoleValidate], deleteShop);

export default ShopRoute;
