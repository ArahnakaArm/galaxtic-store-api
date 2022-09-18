const LOG_SERVICES = {
    DB: {
        DATABASE: 'DATABASE',
        CONNECT_SUCCESS: 'CONNECT DATABASE SUCCESS',
        CONNECT_FAILED: 'CONNECT DATABASE FAILED',
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
    },
};

export default Object.freeze(LOG_SERVICES);