import { logger } from './../../config/logger.config';
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../../utils/status-codes";
import { UrlService } from "../../services/url/url.service";
import { UrlRepository } from "../../repositories/url/url.repository";
import { CacheRepository } from "../../repositories/cacahe/cacahe.repository";
import { publicProcedure } from "../../router/trpc/context";
import z from "zod";
import { InternalServerError } from '../../middleware/types';



/* export class UrlController {
  constructor(private readonly urlService: UrlService) { }

} */

const urlService = new UrlService(new UrlRepository(), new CacheRepository());

export const urlController = {
  create: publicProcedure
    .input(z.object({
      originalUrl: z.string().url().max(2048)  // Validate as URL and limit length
    }))
    .mutation(async ({ input }) => {
      try {
        const shortUrl = await urlService.createShortUrl(input.originalUrl);
        return shortUrl;
      } catch (error) {
        logger.error('Error creating short URL:', error);
        throw new InternalServerError('Failed to create short URL');
      }
    }),

  getOriginalUrl: publicProcedure
    .input(z.object({
      shortUrl: z.string().min(1)  // Ensure shortUrl is not empty
    }))
    .query(async ({ input }) => {
      try {
        const originalUrl = await urlService.getOriginalUrl(input.shortUrl);
        return originalUrl;
      } catch (error) {
        logger.error('Error retrieving original URL:', error);
        throw new InternalServerError('Failed to retrieve original URL');
      }
    })
}


export async function redirectUrl(req: Request, res: Response, next: NextFunction) {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await urlService.getOriginalUrl(shortUrl);
    if (url) {
      await urlService.incrementClicks(shortUrl);
      res.redirect(url?.originalUrl);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).send('URL not found');
      return;
    }
  } catch (error) {
    logger.error('Error redirecting to original URL:', error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send('Failed to redirect');
  }
}