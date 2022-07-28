const status = {
    SUCCESS: {
        RESULT_CODE: '20000',
        DEVELOPER_MESSAGE: 'Success',
    },
    CREATED: {
        RESULT_CODE: '20100',
        DEVELOPER_MESSAGE: 'Created',
    },
    SYSTEM_ERROR: {
        RESULT_CODE: '50000',
        DEVELOPER_MESSAGE: 'System error',
    },
    CONFLICT: {
        RESULT_CODE: '40900',
        DEVELOPER_MESSAGE: 'Conflict',
    },
    NOTFOUND: {
        RESULT_CODE: '40401',
        DEVELOPER_MESSAGE: 'Data not found',
    },
    WRONG_PASSWORD: {
        RESULT_CODE: '40101',
        DEVELOPER_MESSAGE: 'Wrong Password',
    },
    UNAUTHORIZED: {
        RESULT_CODE: '40100',
        DEVELOPER_MESSAGE: 'Unauthorized',
    },
    MISSING_OR_INVALID_PARAMETER: {
        RESULT_CODE: '40000',
        DEVELOPER_MESSAGE: 'Missing or invalid parameter',
    },
};

export default Object.freeze(status);
