export class Author {
  constructor(
		public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public birthdate: string,
    public added: string,
    public readonly id?: number
  ) {}
}
