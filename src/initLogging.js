import winston from 'winston';
const { combine, timestamp, label, printf, prettyPrint } = winston.format;
import 'winston-daily-rotate-file';

const myCustomLevels = {
    levels: {
        info: 0,
        verbose: 0,
        error: 0,
    },
    colors: {
        info: 'blue',
        verbose: 'green',
        error: 'red',
    },
};

const verboseFilter = winston.format((info, opts) => {
    return info.level === 'verbose' ? info : false;
});

const infoLogsTrans = new winston.transports.DailyRotateFile({
    frequency: '15m',
    filename: 'INFO_LOG-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HHmm',
    dirname: 'logs/info',
    level: 'info',
});

const verboseLogsTrans = new winston.transports.DailyRotateFile({
    frequency: '15m',
    filename: 'VERBOSE_LOG-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HHmm',
    dirname: 'logs/verbose',
    level: 'verbose',
    format: combine(verboseFilter()),
});

const errorLogsTrans = new winston.transports.DailyRotateFile({
    frequency: '15m',
    filename: 'ERROR_LOG-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HHmm',
    dirname: 'logs/error',
    level: 'error',
});

const logger = winston.createLogger({
    level: myCustomLevels.levels,
    format: combine(timestamp(), prettyPrint()),
    defaultMeta: {},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        infoLogsTrans,
        verboseLogsTrans,
        errorLogsTrans,
    ],
});

winston.addColors(myCustomLevels.colors);

export { logger };
