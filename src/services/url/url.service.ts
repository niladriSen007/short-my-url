import { CacheRepository } from "../../repositories/cacahe/cacahe.repository";
import { UrlRepository } from "../../repositories/url/url.repository";

export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository,
    private readonly cacheRepository: CacheRepository
  ) { }

   
}