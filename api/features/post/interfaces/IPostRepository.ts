import { Post } from "../entity/Post";

export interface IPostRepository {
  create(data: Post, authorId: number): Promise<Post>;
  update(id: number, data: Post): Promise<Post>;
  find(limit: number, offset: number): Promise<Post[]>;
}
