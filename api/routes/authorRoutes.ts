import Router from "express-promise-router";
import { AuthorController } from "../features/author/controller/AuthorController";
import { AuthorRepository } from "../features/author/repositories/authorRepository";
import { AuthorInteractor } from "../features/author/interactor/authorInteractor";
import { redisClient } from "../config/redisConnection";
import { CacheRepository } from "../features/cache/repositories/cacheRepository";

const repository = new AuthorRepository();
const cache = new CacheRepository();
const interactor = new AuthorInteractor(repository, cache);
const controller = new AuthorController(interactor);

const userRouter = Router();

userRouter
  .route("/authors")
  .get(controller.onGetAuthors.bind(controller))
  .post(controller.onCreateAuthor.bind(controller));

userRouter
  .route("/authors/:id")
  .put(controller.onUpdateAuthor.bind(controller));

userRouter.route("/authors/test").get(async (req, res, _) => {
  const key = `${req.query.key}` || undefined;
  const value = `${req.query.value}` || undefined;

  if (!key || !value)
    return res.status(500).json({ error: "Key and value mst be provided" });

  await redisClient.connect();
  await redisClient.set(key, value);

  const result = await redisClient.get(key);
  return res.status(200).json({ success: `Data stored in redis : ${result}` });
});

export default userRouter;
