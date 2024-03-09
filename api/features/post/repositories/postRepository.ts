import { Pool } from "mariadb";
import { Post } from "../entity/Post";
import { IPostRepository } from "../interfaces/IPostRepository";
import { mariadbClient } from "../../../config/mariadbConnection";

export class PostRepository implements IPostRepository {
  private client: Pool;

  constructor() {
    this.client = mariadbClient();
  }

  async create(
    { title, description, content, date }: Post,
    author_id: number
  ): Promise<Post> {
    const conn = await this.client.getConnection();
    const result = await conn.query(
      "INSERT INTO posts (author_id, title, description, content, date) VALUES (?,?,?,?,?) RETURNING *;",
      [author_id, title, description, content, date]
    );

    return result[0];
	}
	
  async update(
    id: number,
    { title, description, content, date }: Post
  ): Promise<Post> {
    const conn = await this.client.getConnection();
    const result = await conn.query(
      "UPDATE posts SET title=?, description=?, content=?, date=? WHERE id=?;",
      [title, description, content, date, id]
    );

		return result.affectedRows;
	}
	
  async find(limit: number, offset: number): Promise<Post[]> {
    const conn = await this.client.getConnection();
    const result = await conn.query("SELECT p.id, p.title,p.description, p.content, p.date, a.first_name, a.last_name FROM posts p INNER JOIN authors a on p.author_id = a.id LIMIT ? OFFSET ?;", [
      limit,
      offset,
    ]);

    return result;
  }
}
