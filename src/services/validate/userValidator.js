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
        required: ['email', 'user_role', 'password', 'first_name', 'last_name'],
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

const loginValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: ['email', 'password'],
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
        },
    };

    const validateBody = ajv.validate(schema, req.body);
    if (validateBody) {
        next();
    } else {
        returnInvalid(res);
    }
};

const verifyEmailValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: ['verify_code'],
        additionalProperties: false,
        properties: {
            verify_code: {
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

const forgotPasswordValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: ['email'],
        additionalProperties: false,
        properties: {
            email: {
                emptyChecker: true,
                type: 'string',
                format: 'email',
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

const changePasswordWithVerifyCodeValidate = (req, res, next) => {
    const schema = {
        type: 'object',
        required: ['password', 'verify_code_password'],
        additionalProperties: false,
        properties: {
            password: {
                emptyChecker: true,
                type: 'string',
            },
            verify_code_password: {
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

export {
    registerValidate,
    loginValidate,
    verifyEmailValidate,
    forgotPasswordValidate,
    changePasswordWithVerifyCodeValidate,
};
