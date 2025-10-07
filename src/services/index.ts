import { UrlService } from "./url/url.service";
import { repositories } from "../repositories"

export const services = {
  urlService: new UrlService(repositories.urlRepository),
}