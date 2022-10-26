import Ajv from 'ajv';
const ajv = new Ajv();
import addFormats from 'ajv-formats';
import { returnInvalid } from '../handlerResponse.js';
addFormats(ajv);
const authExtend = ['user_id'];

ajv.addKeyword({
    keyword: 'emptyChecker',
    modifying: false,
    schema: false, // keywords value is not used, can be true
    validate: function (data, dataPath, parentData, parentDataProperty) {
        return data !== '';
    },
});

const postProductValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: [...authExtend, 'shop_id', 'main_category_id', 'product_sku', 'product_name', 'product_img'],
        additionalProperties: false,
        properties: {
            user_id: {
                emptyChecker: true,
                type: 'string',
            },
            shop_id: {
                emptyChecker: true,
                type: 'string',
            },
            main_category_id: {
                emptyChecker: true,
                type: 'string',
            },
            product_sku: {
                emptyChecker: true,
                type: 'string',
            },
            product_name: {
                emptyChecker: true,
                type: 'string',
            },
            product_img: {
                emptyChecker: true,
                type: 'string',
            },
        },
    };

    const validateBody = ajv.validate(schema, req.body);
    if (validateBody) {
        next();
    } else {
        returnInvalid(res);
    }
};

export { postProductValidate };
