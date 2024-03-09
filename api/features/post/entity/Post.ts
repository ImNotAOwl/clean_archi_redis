export class Post {
  constructor(
    public readonly author_id: number,
    public readonly title: string,
    public readonly description: string,
    public readonly content: string,
    public readonly date: string,
    public readonly id?: number
  ) {}
}
