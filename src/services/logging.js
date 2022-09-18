import { logger } from '../initLogging.js';

const incommingInfoLogs = (service, message, req) => {
    try {
        if (req.body) req.body.toJSON();
        // eslint-disable-next-line no-empty
    } catch {}
    logger.log({
        level: 'info',
        message: message,
        service: service,
        body: req.body || null,
        method: req.method || null,
        headers: req.headers || null,
    });
};

const infoLogs = (service, message, res = null) => {
    try {
        if (res.resultData.length) {
            let arr = res.resultData;
            res.resultData = arr.map((item) => {
                return item.toJSON();
            });
        }

        if (res.resultData) res.resultData = res.resultData.toJSON();
        // eslint-disable-next-line no-empty

        // eslint-disable-next-line no-empty
    } catch (e) {
        /*  console.log(e); */
    }
    logger.log({
        level: 'info',
        message: message,
        service: service,
        response: res,
    });
};
const systemInfoLogs = (service, message) => {
    logger.log({
        level: 'info',
        message: message,
        service: service,
    });
};

const systemErrorLogs = (service, message) => {
    logger.log({
        level: 'error',
        message: message,
        service: service,
    });
};

export { incommingInfoLogs, infoLogs, systemInfoLogs, systemErrorLogs };
