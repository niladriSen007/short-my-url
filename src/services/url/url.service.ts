import { UrlRepository } from "../../repositories/url/url.repository";

export class UrlService {
  constructor(
    private readonly urlRepository: UrlRepository
  ) { }
}