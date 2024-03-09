import { IPostInteractor } from "../interfaces/IPostInteractor";

export class PostController {
  private interactor: IPostInteractor;

  constructor(interactor: IPostInteractor) {
    this.interactor = interactor;
  }

  async onCreatePost(req: any, res: any, next: any) {
    try {
      const authorId = parseInt(`${req.query.author}`);
      const { body } = req;
      const data = await this.interactor.createPost(body, authorId);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onGetPost(req: any, res: any, next: any) {
    try {
      const offset = parseInt(`${req.query.offset}`) || 0;
      const limit = parseInt(`${req.query.limit}`) || 10;

      const data = await this.interactor.getPosts(limit, offset);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onUpdatePost(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const { body } = req;

      const data = await this.interactor.updatePost(id, body);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
