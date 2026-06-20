// Creating the Logger Configuration
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultConfig = {
    development: {
        transport: {
            targets: [
                {
                    target: 'pino-pretty',
                    level: 'debug',
                    options: {
                        colorize: true,
                        singleLine: false,
                        levelFirst: true,
                        translateTime: 'dd-mm-yyyy HH:MM:ss',
                        ignore: 'pid,hostname'
                    }
                }
            ]
        },
        level: 'debug'
    },
    production: {
        transport: {
            targets: [
                {
                    target: 'pino/file',
                    level: 'info',
                    options: {
                        destination: path.join(__dirname, 'logs', 'production.log'),
                        mkdir: true,
                        sync: true, // make sure logs are written immediately
                        colorize: false,
                        singleLine: true,
                        levelFirst: false,
                        translateTime: 'SYS:standard',
                        ignore: 'pid,hostname'
                    }
                }
            ]
        },
        level: 'info',
        timestamp: () => `,"time":"${new Date().toISOString()}"`,
        messageKey: 'message',
        base: {
            env: process.env.NODE_ENV,
            service: process.env.SERVICE_NAME,
        }
    },
    test: {
        transport: {
            targets: [
                {
                    target: 'pino-pretty',
                    level: 'debug',
                    options: {
                        colorize: true,
                        singleLine: false,
                        levelFirst: true,
                        translateTime: 'dd-mm-yyyy HH:MM:ss',
                        ignore: 'pid,hostname'
                    }
                }
            ]
        },
        level: 'debug'
    }
}

export default defaultConfig
