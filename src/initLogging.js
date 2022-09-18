import winston from 'winston';
const { combine, timestamp, label, printf, prettyPrint } = winston.format;
import 'winston-daily-rotate-file';

const infoLogsTrans = new winston.transports.DailyRotateFile({
    frequency: '15m',
    filename: 'INFO_LOG-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HHmm',
    dirname: 'logs/info',
    level: 'info',
});

const errorLogsTrans = new winston.transports.DailyRotateFile({
    frequency: '15m',
    filename: 'ERROR_LOG-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HHmm',
    dirname: 'logs/error',
    level: 'error',
});

const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(), prettyPrint()),
    defaultMeta: {},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        infoLogsTrans,
        errorLogsTrans,
    ],
});

export { logger };
