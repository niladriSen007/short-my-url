import { IUrl, Url } from './../../models/Url';

export interface CreateUrl {
  originalUrl: string;
  shortUrl: string;
}

export interface UrlStats {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UrlRepository {

  async create(urlData: CreateUrl): Promise<IUrl> {
    const url = new Url(urlData);
    return await url.save();
  }

  async findByShortUrl(shortUrl: string): Promise<IUrl | null> {
    return await Url.findOne({ shortUrl });
  }

  async findAll(): Promise<UrlStats[]> {
    const urls = await Url.find().sort({ createdAt: -1 }).select({
      id: 1,
      originalUrl: 1,
      shortUrl: 1,
      clicks: 1,
      createdAt: 1,
      updatedAt: 1
    });

    return urls.map(url => ({
      id: url._id?.toString() || '',
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    }));
  }

  async incrementClicks(shortUrl: string): Promise<void> {
    await Url.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicks: 1 } }
    );
  }

  async findShortUrlState(shortUrl: string): Promise<UrlStats | null> {
    const url = await Url.findOne({ shortUrl }).select({
      _id: 1,
      originalUrl: 1,
      shortUrl: 1,
      clicks: 1,
      createdAt: 1,
      updatedAt: 1
    });

    if (!url) return null;

    return {
      id: url._id?.toString() || '',
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt
    }

  }

}