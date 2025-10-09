import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';
import { serverConfig } from "./config";
import { loggers } from './config/logger.config';
import { connectRedis } from './config/redis.config';
import { connectDB } from './db';
import { attachCorrelationIdMiddleware } from './middleware/correlation/correlation.middleware';
import { genericErrorHandler, globalErrorHandler } from './middleware/error/error.middleware';
import apiRouter from './router';
import { trpcRouter } from './router/trpc';
import { redirectUrl } from './controllers/url/url.controller';


const app = express();

app.use(express.json());

app.use(attachCorrelationIdMiddleware);

app.use("/trpc", createExpressMiddleware({
  router: trpcRouter
}))

app.use("/:shortUrl", redirectUrl)

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