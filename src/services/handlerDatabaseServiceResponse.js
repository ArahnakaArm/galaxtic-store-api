const dbCreated = (data = null) => {
    const res = {
        dbStatus: 'Created',
        data: data,
    };
    return res;
};

const dbSuccess = (data = null) => {
    const res = {
        dbStatus: 'Success',
        data: data,
    };
    return res;
};

const dbNotFound = () => {
    const res = {
        dbStatus: 'Not Found',
        data: null,
    };
    return res;
};

const dbSysError = () => {
    const res = {
        dbStatus: 'Error',
        data: null,
    };
    return res;
};

const dbConflict = () => {
    const res = {
        dbStatus: 'Conflict',
        data: null,
    };
    return res;
};

const dbEmailNotVerify = () => {
    const res = {
        dbStatus: 'Not Verify',
        data: null,
    };
    return res;
};

const dbWrongPass = () => {
    const res = {
        dbStatus: 'Wrong Password',
        data: null,
    };
    return res;
};

export { dbCreated, dbSuccess, dbNotFound, dbSysError, dbConflict, dbEmailNotVerify, dbWrongPass };
