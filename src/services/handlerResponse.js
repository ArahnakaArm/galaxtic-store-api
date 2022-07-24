import status from '../utils/enum/status.js';

const { SUCCESS, CREATED, SYSTEM_ERROR, CONFLICT, NOTFOUND, WRONG_PASSWORD, UNAUTHORIZED } = status;

const returnSuccess = (res, payload = null) => {
  const resMess = {
    resultCode: SUCCESS.RESULT_CODE,
    developerMessage: SUCCESS.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(SUCCESS.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnCreated = (res, payload = null) => {
  const resMess = {
    resultCode: CREATED.RESULT_CODE,
    developerMessage: CREATED.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(CREATED.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnSystemError = (res, payload = null) => {
  const resMess = {
    resultCode: SYSTEM_ERROR.RESULT_CODE,
    developerMessage: SYSTEM_ERROR.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(SYSTEM_ERROR.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnConflict = (res, payload = null) => {
  const resMess = {
    resultCode: CONFLICT.RESULT_CODE,
    developerMessage: CONFLICT.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(CONFLICT.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnNotfound = (res, payload = null) => {
  const resMess = {
    resultCode: NOTFOUND.RESULT_CODE,
    developerMessage: NOTFOUND.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(NOTFOUND.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnWrongPass = (res, payload = null) => {
  const resMess = {
    resultCode: WRONG_PASSWORD.RESULT_CODE,
    developerMessage: WRONG_PASSWORD.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(WRONG_PASSWORD.RESULT_CODE.substring(0, 3))).send(resMess);
};

const returnUnauthorized = (res, payload = null) => {
  const resMess = {
    resultCode: UNAUTHORIZED.RESULT_CODE,
    developerMessage: UNAUTHORIZED.DEVELOPER_MESSAGE,
  };
  if (payload) resMess.resultData = payload;
  return res.status(Number(UNAUTHORIZED.RESULT_CODE.substring(0, 3))).send(resMess);
};

export {
  returnSuccess,
  returnCreated,
  returnSystemError,
  returnConflict,
  returnNotfound,
  returnWrongPass,
  returnUnauthorized,
};
