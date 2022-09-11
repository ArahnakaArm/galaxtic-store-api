import express from 'express';
import { getAllShop, postShop, patchShop, deleteShop } from '../controllers/shopController.js';
import path from '../utils/enum/path.js';
import { auth, userRoleValidate } from '../services/middleware/auth.js';
import { postShopBymeValidate } from '../services/validate/shopValidator.js';

const ShopRoute = express.Router();

const { SHOP } = path;

ShopRoute.get(SHOP.ADD_SHOP, [auth, userRoleValidate], getAllShop);
ShopRoute.post(SHOP.ADD_SHOP, [auth, userRoleValidate, postShopBymeValidate], postShop);
ShopRoute.patch(SHOP.UPDATE_SHOP, [auth, userRoleValidate], patchShop);
ShopRoute.delete(SHOP.DELETE_SHOP, [auth, userRoleValidate], deleteShop);

export default ShopRoute;
