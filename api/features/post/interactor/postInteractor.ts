import { Post } from "../entity/Post";
import { ICacheRepository } from "../../cache/interfaces/ICacheRepository";
import { IPostInteractor } from "../interfaces/IPostInteractor";
import { IPostRepository } from "../interfaces/IPostRepository";
import { DateTime } from "luxon";

export class PostInteractor implements IPostInteractor {
  private repository: IPostRepository;
  private cacheRedis: ICacheRepository;

  constructor(repository: IPostRepository, cacheRedis: ICacheRepository) {
    this.repository = repository;
    this.cacheRedis = cacheRedis;
  }

  async createPost(input: any, authorId: number): Promise<Post> {
    input["date"] = DateTime.now().toFormat("yyyy-MM-dd");
    return await this.repository.create(input, authorId);
  }

  async getPosts(limit: number, offset: number): Promise<Post[]> {
    const redisKey = `posts.${offset}:${limit}`;
    const postsCache = await this.cacheRedis.get(redisKey);
    if (postsCache) return postsCache;

    const postsDb = await this.repository.find(limit, offset);
    const posts = postsDb.map((el) => ({
      ...el,
      date: DateTime.fromFormat(el.date, "yyyy-MM-dd").toFormat(
        "dd-MM-yyyy"
      ),
    }));

    await this.cacheRedis.set(redisKey, JSON.stringify(postsDb));
    return posts;
  }

  async updatePost(id: number, data: any): Promise<Object> {
    data["date"] = DateTime.now().toFormat("yyyy-MM-dd");

    const result = await this.repository.update(id, data);

    if (result) return { success: "Post updated" };
    else return { error: "Post not updated" };
  }
}
