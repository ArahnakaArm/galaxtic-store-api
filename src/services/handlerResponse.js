import status from '../utils/enum/status.js';
import { infoLogs } from '../services/logging.js';
import LOG_SERVICES from '../utils/enum/logs.js';
const {
    SUCCESS,
    CREATED,
    SYSTEM_ERROR,
    CONFLICT,
    NOTFOUND,
    WRONG_PASSWORD,
    UNAUTHORIZED,
    MISSING_OR_INVALID_PARAMETER,
    EMAIL_NOT_VERIFY,
} = status;

const returnSuccess = (res, payload = null, count = null) => {
    const resMess = {
        resultCode: SUCCESS.RESULT_CODE,
        developerMessage: SUCCESS.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    if (count) resMess.rowCount = count;
    infoLogs(res.req.originalUrl, `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.SUCCESS}`, resMess);
    return res.status(Number(SUCCESS.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnCreated = (res, payload = null) => {
    const resMess = {
        resultCode: CREATED.RESULT_CODE,
        developerMessage: CREATED.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(res.req.originalUrl, `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.CREATED}`, resMess);
    return res.status(Number(CREATED.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnSystemError = (res, payload = null) => {
    const resMess = {
        resultCode: SYSTEM_ERROR.RESULT_CODE,
        developerMessage: SYSTEM_ERROR.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(
        res.req.originalUrl,
        `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.SYSTEM_ERROR}`,
        resMess,
    );
    return res.status(Number(SYSTEM_ERROR.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnConflict = (res, payload = null) => {
    const resMess = {
        resultCode: CONFLICT.RESULT_CODE,
        developerMessage: CONFLICT.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(res.req.originalUrl, `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.CONFLICT}`, resMess);
    return res.status(Number(CONFLICT.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnNotfound = (res, payload = null) => {
    const resMess = {
        resultCode: NOTFOUND.RESULT_CODE,
        developerMessage: NOTFOUND.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(res.req.originalUrl, `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.NOT_FOUND}`, resMess);
    return res.status(Number(NOTFOUND.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnWrongPass = (res, payload = null) => {
    const resMess = {
        resultCode: WRONG_PASSWORD.RESULT_CODE,
        developerMessage: WRONG_PASSWORD.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(
        res.req.originalUrl,
        `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.WRONG_PASSWORD}`,
        resMess,
    );
    return res.status(Number(WRONG_PASSWORD.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnUnauthorized = (res, payload = null) => {
    const resMess = {
        resultCode: UNAUTHORIZED.RESULT_CODE,
        developerMessage: UNAUTHORIZED.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(
        res.req.originalUrl,
        `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.UNAUTHORIZED}`,
        resMess,
    );
    return res.status(Number(UNAUTHORIZED.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnInvalid = (res, payload = null) => {
    const resMess = {
        resultCode: MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
        developerMessage: MISSING_OR_INVALID_PARAMETER.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(
        res.req.originalUrl,
        `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.MISSING_OR_INVALID}`,
        resMess,
    );
    return res.status(Number(MISSING_OR_INVALID_PARAMETER.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnEmailNotVerify = (res, payload = null) => {
    const resMess = {
        resultCode: EMAIL_NOT_VERIFY.RESULT_CODE,
        developerMessage: EMAIL_NOT_VERIFY.DEVELOPER_MESSAGE,
    };
    if (payload) resMess.resultData = payload;
    infoLogs(
        res.req.originalUrl,
        `${LOG_SERVICES.MESSAGE_OUTGOING}${LOG_SERVICES.OUTGOING_STATUS.EMAIL_NOT_VERIFY}`,
        resMess,
    );
    return res.status(Number(EMAIL_NOT_VERIFY.RESULT_CODE.substring(0, 3))).send(resMess);
};

export {
    returnSuccess,
    returnCreated,
    returnSystemError,
    returnConflict,
    returnNotfound,
    returnWrongPass,
    returnUnauthorized,
    returnInvalid,
    returnEmailNotVerify,
};
