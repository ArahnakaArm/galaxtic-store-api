const LOG_SERVICES = {
    DB: {
        DATABASE: 'DATABASE',
        CONNECT_SUCCESS: 'CONNECT DATABASE SUCCESS',
        CONNECT_FAILED: 'CONNECT DATABASE FAILED',
        CMD: {
            USER: {
                FIND: 'FIND_USER',
                CREATE: 'CREATE_USER',
                UPDATE: 'UPDATE_USER',
                CHECK_STATUS: 'CHECK_USER_STATUS',
            },
            USER_INFO: {
                FIND: 'FIND_USER_INFO',
                CREATE: 'CREATE_USER_INFO',
                UPDATE: 'UPDATE_USER_INFO',
            },
            MAIN_CATEGORY: {
                FIND: 'FIND_MAIN_CATEGORY',
            },
            MONTHLY_PROMOTION: {
                FIND: 'FIND_MONTHLY_PROMOTION',
                CREATE: 'CREATE_MONTHLY_PROMOTION',
                DELETE: 'DELETE_MONTHLY_PROMOTION',
            },
            SHIPPING: {
                FIND: 'FIND_SHIPPING',
                CRAETE: 'CREATE_SHIPPING',
                UPDATE: 'UPDATE_SHIPPING',
                DELETE: 'DELETE_SHIPPING',
            },
            SHOP: {
                FIND: 'FIND_SHOP',
                CRAETE: 'CREATE_SHOP',
                UPDATE: 'UPDATE_SHOP',
                DELETE: 'DELETE_SHOP',
            },
            COMMON: {
                SYSTEM: 'SYSTEM',
            },
        },
        STATUS: {
            SUCCESS: 'SUCCESS',
            FAILED: 'FAILED',
        },
        MESSAGE: {
            NOT_FOUND: 'NOT_FOUND',
            SUCCESS: 'SUCCESS',
            NOT_VERIFY: 'NOT_VERIFY',
            CONFLICT: 'CONFLICT',
            ERROR: 'ERROR',
        },
    },
    MESSAGE_INCOMMING: 'INCOMMING',
    MESSAGE_OUTGOING: 'OUTGOING:',
    OUTGOING_STATUS: {
        SUCCESS: 'SUCCESS',
        CREATED: 'CREATED',
        SYSTEM_ERROR: 'SYSTEM_ERROR',
        CONFLICT: 'CONFLICT',
        NOT_FOUND: 'NOT_FOUND',
        WRONG_PASSWORD: 'WRONG_PASSWORD',
        UNAUTHORIZED: 'UNAUTHORIZED',
        MISSING_OR_INVALID: 'MISSING_OR_INVALID',
        EMAIL_NOT_VERIFY: 'EMAIL_NOT_VERIFY',
    },
};

export default Object.freeze(LOG_SERVICES);
