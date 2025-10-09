import { logger } from './../../config/logger.config';
import { Request, Response } from "express";
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
        return { shortUrl };
      } catch (error) {
        logger.error('Error creating short URL:', error);
        throw new InternalServerError('Failed to create short URL');
      }
    }),
}