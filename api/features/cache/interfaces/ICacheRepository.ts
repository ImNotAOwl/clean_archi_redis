import { Post } from "../../post/entity/Post";

export interface ICacheRepository {
  get(key: string): Promise<Post[] | null>;
  set(key: string, data: string): Promise<void>;
}
