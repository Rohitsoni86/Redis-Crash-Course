import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function initializeRedisClient() {
    if (!client) {
        client = createClient()
        client.on(
            "error",
            (error) => {
                console.error("Redis client error : ", error);
            }
        )
        client.on("connect", () => {
            console.log("Redis client connected");
        })
        client.on("reconnect", () => {
            console.log("Redis client reconnected");
        })
        await client.connect()
        console.log("Redis client connected");
    }
    return client;
}

export async function quitRedisClient() {
    if (client) {
        await client.quit()
        client = null
        console.log("Redis client disconnected");
    }
}