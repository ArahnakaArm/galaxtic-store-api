import express from 'express';
import path from '../utils/enum/path.js';
import {
    getShippingInfoByMe,
    postShippingInfoByMe,
    putShippingInfoByMe,
    patchShippingInfoByMe,
    deleteShippingInfoByMe,
} from '../controllers/shippingController.js';
import { auth, adminRoleValidate, userRoleValidate } from '../services/middleware/auth.js';
import { postShippingInfoByMeValidate } from '../services/validate/shippingValidator.js';

const ShippingRoute = express.Router();

const { SHIPPING } = path;

const prefix = '/shipping';

ShippingRoute.get(prefix + SHIPPING.SHIPPING_INFO, [auth, userRoleValidate], getShippingInfoByMe);

ShippingRoute.post(
    prefix + SHIPPING.SHIPPING_INFO,
    [auth, userRoleValidate, postShippingInfoByMeValidate],
    postShippingInfoByMe,
);

ShippingRoute.put(
    prefix + SHIPPING.SHIPPING_INFO_UPDATE,
    [auth, userRoleValidate, postShippingInfoByMeValidate],
    putShippingInfoByMe,
);

ShippingRoute.patch(prefix + SHIPPING.SHIPPING_INFO_UPDATE, [auth, userRoleValidate], patchShippingInfoByMe);

ShippingRoute.delete(prefix + SHIPPING.SHIPPING_INFO_UPDATE, [auth, userRoleValidate], deleteShippingInfoByMe);

export default ShippingRoute;
