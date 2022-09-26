import express from 'express';
import path from '../utils/enum/path.js';
import {
    getShippingInfoByMe,
    getByIdShippingInfoByMe,
    postShippingInfoByMe,
    putShippingInfoByMe,
    patchShippingInfoByMe,
    deleteShippingInfoByMe,
} from '../controllers/shippingController.js';
import { auth, adminRoleValidate, userRoleValidate } from '../services/middleware/auth.js';
import { postShippingInfoByMeValidate } from '../services/validate/shippingValidator.js';
import incommingLog from '../services/middleware/incommingLog.js';

const ShippingRoute = express.Router();

const { SHIPPING } = path;

const prefix = '/shipping';

ShippingRoute.get(prefix + SHIPPING.SHIPPING_INFO, [incommingLog, auth, userRoleValidate], getShippingInfoByMe);

ShippingRoute.get(
    prefix + SHIPPING.SHIPPING_INFO_BY_ID,
    [incommingLog, auth, userRoleValidate],
    getByIdShippingInfoByMe,
);

ShippingRoute.post(
    prefix + SHIPPING.SHIPPING_INFO,
    [incommingLog, auth, userRoleValidate, postShippingInfoByMeValidate],
    postShippingInfoByMe,
);

ShippingRoute.put(
    prefix + SHIPPING.SHIPPING_INFO_UPDATE,
    [incommingLog, auth, userRoleValidate, postShippingInfoByMeValidate],
    putShippingInfoByMe,
);

ShippingRoute.patch(
    prefix + SHIPPING.SHIPPING_INFO_UPDATE,
    [incommingLog, auth, userRoleValidate],
    patchShippingInfoByMe,
);

ShippingRoute.delete(
    prefix + SHIPPING.SHIPPING_INFO_UPDATE,
    [incommingLog, auth, userRoleValidate],
    deleteShippingInfoByMe,
);

export default ShippingRoute;
