import { NotFoundError } from './../../middleware/types';
import { serverConfig } from "../../config";
import { CacheRepository } from "../../repositories/cacahe/cacahe.repository";
import { UrlRepository } from "../../repositories/url/url.repository";
import { toBase62 } from "../../utils/base62Conversion";

export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly cacheRepository: CacheRepository
  ) { }

  async createShortUrl(originalUrl: string) {
    const nextUrlId = await this.cacheRepository.getNextId();
    const shortUrl = toBase62(nextUrlId);
    const url = await this.urlRepository.create({
      originalUrl,
      shortUrl
    })

    await this.cacheRepository.setUrlMapping(shortUrl, originalUrl);
    const baseUrl = serverConfig?.BASE_URL;
    const redirectUrl = `${baseUrl}/${shortUrl}`;

    return {
      shortUrl,
      originalUrl,
      fullUrl: redirectUrl,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    }
  }


  async getOriginalUrl(shortUrl: string) {
    const originalUrl = await this.cacheRepository.getUrlMapping(shortUrl);
    if (originalUrl) {
      await this.urlRepository.incrementClicks(shortUrl);
      return {
        originalUrl,
        shortUrl
      };
    }

    const url = await this.urlRepository.findByShortUrl(shortUrl);
    if (!url) {
      throw new NotFoundError('URL not found');
    }
    await this.urlRepository.incrementClicks(shortUrl);
    await this.cacheRepository.setUrlMapping(shortUrl, url.originalUrl);
    return {
      originalUrl: url.originalUrl,
      shortUrl
    }
  }

  async incrementClicks(shortUrl: string) {
    await this.urlRepository.incrementClicks(shortUrl);
  }


}