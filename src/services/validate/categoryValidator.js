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

const postMainCategoryValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: [...authExtend, 'main_category_name', 'main_category_image_url'],
        additionalProperties: false,
        properties: {
            user_id: {
                emptyChecker: true,
                type: 'string',
            },
            main_category_name: {
                emptyChecker: true,
                type: 'string',
            },
            main_category_image_url: {
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

export { postMainCategoryValidate };
