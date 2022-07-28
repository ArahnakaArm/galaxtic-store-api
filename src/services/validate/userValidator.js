import Ajv from 'ajv';
const ajv = new Ajv();
import addFormats from 'ajv-formats';
import { returnInvalid } from '../../services/handlerResponse.js';
addFormats(ajv);

ajv.addKeyword('emptyChecker', {
    modifying: false,
    schema: false, // keywords value is not used, can be true
    validate: function (data, dataPath, parentData, parentDataProperty) {
        return data !== '';
    },
});

const registerValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: ['email', 'user_role', 'first_name', 'last_name'],
        additionalProperties: false,
        properties: {
            email: {
                emptyChecker: true,
                type: 'string',
                format: 'email',
            },
            password: {
                emptyChecker: true,
                type: 'string',
            },
            user_role: {
                emptyChecker: true,
                type: 'string',
                enum: ['ADMIN', 'USER'],
            },
            first_name: {
                emptyChecker: true,
            },
            last_name: {
                emptyChecker: true,
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

export { registerValidate };
