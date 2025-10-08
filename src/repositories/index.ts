import { CacheRepository } from "./cacahe/cacahe.repository";
import { UrlRepository } from "./url/url.repository";

export const repositories = {
  urlRepository : new UrlRepository(),
  cacheRepository : new CacheRepository()
}