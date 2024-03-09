import { RedisClientType } from "redis";
import { Post } from "../../post/entity/Post";
import { ICacheRepository } from "../interfaces/ICacheRepository";
import { redisClient } from "../../../config/redisConnection";

export class CacheRepository implements ICacheRepository {
  private client: RedisClientType;

  constructor() {
    this.client = redisClient;
  }

  async get(key: string): Promise<Post[] | null> {
    await this.client.connect();
    const posts = await this.client.get(key);
    await this.client.disconnect();
    if (!posts) return null;
    console.log("CacheRepository get");

    return JSON.parse(posts);
  }

  async set(key: string, data: string): Promise<void> {
    await this.client.connect();

    const result = await this.client.set(key, data);
    console.log("CacheRepository set", result);

    await this.client.disconnect();
  }
}
