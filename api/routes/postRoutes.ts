import Router from "express-promise-router";
import { PostController } from "../features/post/controller/PostController";
import { PostRepository } from "../features/post/repositories/postRepository";
import { PostInteractor } from "../features/post/interactor/postInteractor";
import { CacheRepository } from "../features/cache/repositories/cacheRepository";

const repository = new PostRepository();
const cache = new CacheRepository()
const interactor = new PostInteractor(repository, cache);
const controller = new PostController(interactor);
const postRouter = Router();

postRouter
  .route("/posts")
  .get(controller.onGetPost.bind(controller))
  .post(controller.onCreatePost.bind(controller));

postRouter
	.route("/posts/:id")
	.put(controller.onUpdatePost.bind(controller));

export default postRouter;
