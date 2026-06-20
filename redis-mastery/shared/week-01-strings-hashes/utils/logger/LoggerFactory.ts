//  Implementing the Logger Factory
// The Singleton pattern ensures consistent logger in

import pino from 'pino';
import type { Logger, LoggerOptions, Bindings } from 'pino';
import defaultConfig from './config';
import { LOG_LEVELS, LEVEL_ORDER, ENVIRONMENTS } from './constants';



// Factory Pattern Benefits:

// Centralized logger configuration
// Easy instance management
// Simplified child logger creation
// Consistent logging behavior


// below is the full production ready code

export default class LoggerFactory {
    static #instance: LoggerFactory;
    #logger: Logger | null = null;
    #childLoggers: Map<string, Logger> = new Map();

    private constructor() { }

    static getInstance(): LoggerFactory {
        if (!LoggerFactory.#instance) {
            LoggerFactory.#instance = new LoggerFactory();
        }
        return LoggerFactory.#instance;
    }

    initialize(options: LoggerOptions = {}): Logger {
        const env = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
        // @ts-ignore - Indexing dynamically based on env
        const baseConfig = defaultConfig[env] || defaultConfig[ENVIRONMENTS.DEVELOPMENT];

        try {
            this.#logger = pino({
                ...baseConfig,
                ...options
            });

            this.#logger.info({
                env,
                nodeVersion: process.version,
                pid: process.pid
            }, 'Logger initialized successfully');

        } catch (error) {
            console.error('Error initializing logger:', error);
            this.#logger = pino({
                level: 'info',
                timestamp: true
            });
        }

        return this.#logger;
    }

    getLogger(name?: string): Logger {
        if (!this.#logger) {
            this.initialize();
        }
        
        if (name) {
            return this.createChildLogger({ name });
        }

        return this.#logger!;
    }

    createChildLogger(bindings: Bindings): Logger {
        const logger = this.getLogger();
        
        if (bindings.name && this.#childLoggers.has(bindings.name)) {
            return this.#childLoggers.get(bindings.name)!;
        }

        const childLogger = logger.child(bindings);
        
        if (bindings.name) {
            this.#childLoggers.set(bindings.name, childLogger);
        }
        
        return childLogger;
    }
}



// Usage example
const logger = LoggerFactory.getInstance().getLogger();
logger.info('Application started');
