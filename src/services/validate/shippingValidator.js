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

const postShippingInfoByMeValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: [...authExtend, 'shipping_address', 'tel_number'],
        additionalProperties: false,
        properties: {
            user_id: {
                emptyChecker: true,
                type: 'string',
            },
            shipping_address: {
                emptyChecker: true,
                type: 'string',
            },
            tel_number: {
                emptyChecker: true,
                type: 'string',
                pattern: '^[0][0-9]{9}$',
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

export { postShippingInfoByMeValidate };
