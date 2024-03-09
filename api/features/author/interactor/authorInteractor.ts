import { DateTime } from "luxon";
import { ICacheRepository } from "../../cache/interfaces/ICacheRepository";
import { IAuthorInteractor } from "../interfaces/IAuthorInteractor";
import { IAuthorRepository } from "../interfaces/IAuthorRepository";

export class AuthorInteractor implements IAuthorInteractor {
  private repository: IAuthorRepository;
  private cacheRedis: ICacheRepository;

  constructor(repository: IAuthorRepository, cacheRedis: ICacheRepository) {
    this.repository = repository;
    this.cacheRedis = cacheRedis;
  }

  async createAuthor(input: any) {
    return this.repository.create(input);
  }

  async getAuthors(limit: number, offset: number) {
    const redisKey = `authors.${offset}:${limit}`;
    const authorsCache = await this.cacheRedis.get(redisKey);
    if (authorsCache) return authorsCache;

    const authors = await this.repository.find(limit, offset);

    const authorsDateFormat = authors.map((el) => ({
      ...el,
      birthdate: DateTime.fromFormat(
        el.birthdate,
        "yyyy-MM-dd hh:mm:ss"
      ).toFormat("dd-MM-yyyy"),
      added: DateTime.fromFormat(el.added, "yyyy-MM-dd hh:mm:ss").toFormat(
        "dd-MM-yyyy"
      ),
    }));
    await this.cacheRedis.set(redisKey, JSON.stringify(authorsDateFormat));
    return authorsDateFormat;
  }

  async updateAuthor(id: number, data: object) {
    const result = await this.repository.update(id, data);
    if (result) return { success: "Author updated" };
    else return { error: "Author not updated" };
  }
}
