import { createClient } from "redis";
import { serverConfig } from ".";

export const redisClient = createClient({
  url: serverConfig?.REDIS_URI
})

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log("Redis client connected successfully"));

export async function connectRedis() {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    throw error;
  }
}

export async function disconnectRedis() {
  await redisClient.quit();
}
