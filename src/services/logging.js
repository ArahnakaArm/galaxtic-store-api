import { logger } from '../initLogging.js';
import LOG_SERVICES from '../utils/enum/logs.js';

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
        query: req.query || null,
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

const verboseLogs = (service, cmd, status, message) => {
    logger.log({
        level: 'verbose',
        message: message,
        service: service,
        cmd: cmd,
        status: status,
    });
};

const verboseDBLogs = (cmd, status, info, data = null) => {
    const message = `${cmd}_${info}`;
    logger.log({
        level: 'verbose',
        message: message,
        service: 'DATABASE',
        cmd: cmd,
        status: status,
        data: data,
    });
};

const systemErrorLogs = (service, message) => {
    logger.log({
        level: 'error',
        message: message,
        service: service,
    });
};

export { incommingInfoLogs, infoLogs, systemInfoLogs, verboseLogs, verboseDBLogs, systemErrorLogs };
