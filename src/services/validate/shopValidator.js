import Ajv from 'ajv';
const ajv = new Ajv();
import addFormats from 'ajv-formats';
import { returnInvalid } from '../../services/handlerResponse.js';
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

const postShopBymeValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: [...authExtend, 'shop_name'],
        additionalProperties: false,
        properties: {
            user_id: {
                emptyChecker: true,
                type: 'string',
            },
            shop_name: {
                emptyChecker: true,
                type: 'string',
            },
        },
    };
    const validateBody = ajv.validate(schema, req.body);
    if (validateBody) {
        next();
    } else {
        /*      const validateError = ajv.errorsText();
        console.log(validateError); */
        returnInvalid(res);
    }
};

export { postShopBymeValidate };
