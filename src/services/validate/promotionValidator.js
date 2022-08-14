import Ajv from 'ajv';
const ajv = new Ajv();
import addFormats from 'ajv-formats';
import { returnInvalid } from '../../services/handlerResponse.js';
addFormats(ajv);
const authExtend = ['user_id'];

ajv.addKeyword('emptyChecker', {
    modifying: false,
    schema: false, // keywords value is not used, can be true
    validate: function (data, dataPath, parentData, parentDataProperty) {
        return data !== '';
    },
});

const postMonthlyPromotionValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: [...authExtend, 'imgae_url', 'url', 'contents'],
        additionalProperties: false,
        properties: {
            user_id: {
                emptyChecker: true,
                type: 'string',
            },
            imgae_url: {
                emptyChecker: true,
                type: 'string',
            },
            url: {
                emptyChecker: true,
                type: 'string',
            },
            contents: {
                emptyChecker: true,
                type: 'array',
                items: {
                    type: 'object',
                    required: ['image_url', 'url'],
                    additionalProperties: false,
                    properties: {
                        image_url: {
                            emptyChecker: true,
                            type: 'string',
                        },
                        url: {
                            emptyChecker: true,
                            type: 'string',
                        },
                    },
                },
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

export { postMonthlyPromotionValidate };
