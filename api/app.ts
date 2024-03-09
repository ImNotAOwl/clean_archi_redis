import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./routes/authorRoutes";
import postRouter from "./routes/postRoutes";

dotenv.config({ path: `./config/${process.env.NODE_ENV}.env` });
const app: Express = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet());

app.disable("x-powered-by");

app.use(userRouter);
app.use(postRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my clean archi project");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port : ${process.env.PORT}`);
});
