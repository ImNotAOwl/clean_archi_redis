import { IAuthorInteractor } from "../interfaces/IAuthorInteractor";

export class AuthorController {
  private interactor: IAuthorInteractor;

  constructor(interactor: IAuthorInteractor) {
    this.interactor = interactor;
  }

  async onCreateAuthor(req: any, res: any, next: any) {
    try {
      const { body } = req;
      const data = await this.interactor.createAuthor(body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onGetAuthors(req: any, res: any, next: any) {
    try {
      const offset = parseInt(`${req.query.offset}`) || 0;
      const limit = parseInt(`${req.query.limit}`) || 10;

      const data = await this.interactor.getAuthors(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onUpdateAuthor(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { body } = req;

      const data = await this.interactor.updateAuthor(id, body);
			
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
