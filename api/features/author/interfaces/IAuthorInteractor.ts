export interface IAuthorInteractor {
  createAuthor(input: any): any;
  getAuthors(limit: number, offset: number): any;
  updateAuthor(id: number, data: object): any;
}
