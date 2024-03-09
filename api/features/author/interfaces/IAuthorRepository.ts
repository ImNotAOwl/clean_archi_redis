import { Author } from "../entity/Author";

export interface IAuthorRepository {
  create(data: Author): Promise<Author>;
  find(limit: number, offser: number): Promise<Author[]>;
  update(id: number, data: object): Promise<Author>;
}