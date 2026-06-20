// create pion constants

const LOG_LEVELS = {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug',
    TRACE: 'trace',
    FATAL: 'fatal',
}

const LEVEL_ORDER = [
    LOG_LEVELS.FATAL,
    LOG_LEVELS.ERROR,
    LOG_LEVELS.WARN,
    LOG_LEVELS.INFO,
    LOG_LEVELS.DEBUG,
    LOG_LEVELS.TRACE,
] as const;




const ENVIRONMENTS = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test',
} as const;



export {
    LOG_LEVELS,
    LEVEL_ORDER,
    ENVIRONMENTS
}


