import { createClient } from 'redis';
import type { RedisClientType } from 'redis';
import LoggerFactory from '../utils/logger/LoggerFactory';

export class RedisService {
    private static instance: RedisService;
    private client: RedisClientType;
    private logger = LoggerFactory.getInstance().getLogger('redis');

    private constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379',
            socket: {
                reconnectStrategy: (retries: number) => {
                    if (retries > 10) {
                        this.logger.error('Redis reconnect strategy exhausted');
                        return new Error('Retry attempts exhausted');
                    }
                    this.logger.warn(`Redis reconnecting... attempt ${retries}`);
                    // Exponential backoff strategy
                    return Math.min(retries * 50, 2000);
                }
            }
        });

        this.attachEventListeners();
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    private attachEventListeners() {
        this.client.on('connect', () => this.logger.info('Redis client initiating connection...'));
        this.client.on('ready', () => this.logger.info('Redis client connected and ready to use'));
        this.client.on('error', (err) => this.logger.error({ err }, 'Redis Client Error'));
        this.client.on('reconnecting', () => this.logger.warn('Redis client reconnecting...'));
        this.client.on('end', () => this.logger.info('Redis client connection closed'));
    }

    public async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    public async disconnect() {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }

    public getClient(): RedisClientType {
        return this.client;
    }

    public async ping(): Promise<boolean> {
        try {
            const res = await this.client.ping();
            return res === 'PONG';
        } catch (error) {
            this.logger.error({ error }, 'Redis ping failed');
            return false;
        }
    }
}

export const redisService = RedisService.getInstance();
export const redisClient = redisService.getClient();