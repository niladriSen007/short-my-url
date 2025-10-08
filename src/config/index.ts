
import dotenv from 'dotenv';
import { ServerConfig } from './types';


function loadDotEnv() {
  const env = dotenv.config();
  if (env.error) {
    throw env.error;
  }
  return "Environment variables loaded successfully";
}
loadDotEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 4000,
  MONGO_URI: process.env.MONGO_URI || "",
  REDIS_URI: process.env.REDIS_URI || "redis://localhost:6379",
  REDIS_COUNTER_KEY: process.env.REDIS_COUNTER_KEY || "url_shortner_counter",
  REDIS_URL_TTL_SECONDS: Number(process.env.REDIS_URL_TTL_SECONDS) || 86400, // 1 day
}
