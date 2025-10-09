export interface ServerConfig {
  PORT: number
  MONGO_URI: string
  REDIS_URI: string
  REDIS_COUNTER_KEY: string
  REDIS_URL_TTL_SECONDS: number
  BASE_URL: string
}
