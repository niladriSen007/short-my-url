import express from 'express';
import { serverConfig } from "./config"
import { genericErrorHandler, globalErrorHandler } from './middleware/error/error.middleware';
import { loggers } from './config/logger.config';
import apiRouter from './router';
import { attachCorrelationIdMiddleware } from './middleware/correlation/correlation.middleware';
import { connectDB } from './db';
import { connectRedis } from './config/redis.config';


const app = express();

app.use(express.json());

app.use(attachCorrelationIdMiddleware);

app.use("/api", apiRouter)

app.use(globalErrorHandler)
app.use(genericErrorHandler)

app.listen(serverConfig.PORT, async () => {
  loggers.info(`Server is running on port ${serverConfig.PORT}`);
  loggers.warning(`Press Ctrl+C to stop the server.`);

  await connectRedis();

  await connectDB();
  loggers.success(`Database connection has been established successfully.`);
});