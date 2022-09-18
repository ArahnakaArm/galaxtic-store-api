import { incommingInfoLogs } from '../../services/logging.js';
import LOG_SERVICES from '../../utils/enum/logs.js';

const incommingLog = (req, res, next) => {
    incommingInfoLogs(req.originalUrl, `${LOG_SERVICES.MESSAGE_INCOMMING}`, req);
    next();
};

export default incommingLog;
