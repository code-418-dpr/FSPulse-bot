// Универсальный логгер с уровнями и таймстампом

export enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG",
}

function timestamp(): string {
    return new Date().toISOString();
}

function format(level: LogLevel, msg: string): string {
    return `[${timestamp()}] [${level}] ${msg}`;
}

export const logger = {
    info: (msg: string) => {
        console.log(format(LogLevel.INFO, msg));
    },
    warn: (msg: string) => {
        console.warn(format(LogLevel.WARN, msg));
    },
    error: (msg: string) => {
        console.error(format(LogLevel.ERROR, msg));
    },
    debug: (msg: string) => {
        // DEBUG-логи выводятся только в режиме разработки
        if (process.env.NODE_ENV === "development") {
            console.debug(format(LogLevel.DEBUG, msg));
        }
    },
};
