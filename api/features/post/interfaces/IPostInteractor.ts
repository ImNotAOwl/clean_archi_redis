import { Post } from "../entity/Post";

export interface IPostInteractor {
  createPost(input: any, authorId: number): Promise<Post>;
  getPosts(limit: number, offset: number): Promise<Post[]>;
  updatePost(id: number, data: object): Promise<Object>;
}
