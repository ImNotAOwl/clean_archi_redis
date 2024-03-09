import { Author } from "../entity/Author";
import { IAuthorRepository } from "../interfaces/IAuthorRepository";
import { mariadbClient } from "../../../config/mariadbConnection";
import { Pool } from "mariadb";

export class AuthorRepository implements IAuthorRepository {
  private client: Pool;

  constructor() {
    this.client = mariadbClient();
  }

  async create({
    first_name,
    last_name,
    email,
    birthdate,
    added,
  }: Author): Promise<Author> {
    const conn = await this.client.getConnection();
    const result = await conn.query(
      "INSERT INTO authors (first_name, last_name, email, birthdate, added) VALUES (?,?,?,?,?) RETURNING *;",
      [first_name, last_name, email, birthdate, added]
    );

    return result[0];
  }

  async update(
    id: number,
    { first_name, last_name, email, birthdate, added }: Author
  ): Promise<Author> {
    const conn = await this.client.getConnection();
    const result = await conn.query(
      "UPDATE authors SET first_name=?, last_name=?, email=?, birthdate=?, added=? WHERE id=?;",
      [first_name, last_name, email, birthdate, added, id]
    );

    return result.affectedRows;
  }

  async find(limit: number, offset: number): Promise<Author[]> {
    const conn = await this.client.getConnection();
    const result = await conn.query("SELECT * FROM authors LIMIT ? OFFSET ?;", [
      limit,
      offset,
    ]);

    return result;
  }
}
