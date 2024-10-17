//logger.js
import * as dotenv from "dotenv";
dotenv.config();
import { createLogger, format, transports } from 'winston';
const { combine, timestamp: timestampImport, label: labelImport, printf, errors, colorize, prettyPrint } = format;

const label = process.env.NAME_API || 'api-node-typescript';

const myFormat = combine(
    colorize(),
    timestampImport({ format: 'DD-MM-YYYY HH:mm:ss' }),
    labelImport({ label }),
    errors({ stack: true }),
    printf(({ level, timestamp, label, message, stack, ...meta }) => {
        message = message ? JSON.stringify(message, null, 2) : "";

        let result = `${timestamp} [${label}] level: ${level} - message: ${message}`;

        if (stack) {
            result += ' - stack: ' + stack;
        }

        if (Object.keys(meta).length > 0) {
            result += ' - meta: ' + JSON.stringify(meta, null, 2);
        }

        return result;
    }));

const logger = createLogger({
    exitOnError: false,
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            handleExceptions: true,
            level: 'error',
            format: myFormat,
            zippedArchive: true,

        }),
        new transports.File({
            filename: 'logs/info.log',
            handleExceptions: true,
            level: 'info',
            format: myFormat
        }),
        new transports.File({
            filename: 'logs/objects.log',
            level: 'info',
            handleExceptions: true,
            format: combine(
                timestampImport({ format: 'DD-MM-YYYY HH:mm:ss' }),
                errors({
                    stack: true
                }),
                prettyPrint()
            )
        })
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        handleExceptions: true,
        debugStdout: true,
        level: 'info',
        format: myFormat
    }));
}

export default logger;
