import { Request, Response } from "express";
import { HttpStatusCode } from "../../utils/status-codes";
import { UrlService } from "../../services/url/url.service";



export class UrlController {
  constructor(private readonly urlService: UrlService) { }

}