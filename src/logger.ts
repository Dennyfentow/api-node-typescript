//logger.js
import { createLogger, format, transports } from 'winston';
const { combine, timestamp: timestampImport, label: labelImport, printf, errors, colorize, prettyPrint } = format;

const myFormat = combine(
    colorize(),
    timestampImport({ format: 'DD-MM-YYYY HH:mm:ss' }),
    labelImport({ label: 'node-api-jornadas' }),
    errors({ stack: true }),
    printf(({ level, timestamp, label, message, stack, }) => {
        const result: string = message ? JSON.stringify(message) : "";
        if (stack) {
            return `${timestamp} [${label}] level: ${level} - error: ${result} - stack: ${stack} \n`;
        } else {
            return `${timestamp} [${label}] level: ${level} - ${result} \n`;
        }
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
