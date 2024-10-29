import express, { NextFunction, Request, request, Response, response } from "express";
import { config } from "./config";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";
import { NotFoundError } from "./errors";
import { SignInRouter } from "./features/auth/sign-in/route";
import { errorMiddleware } from "./middlewares/error";
import { notfoundMiddleware } from "./middlewares/not-found";

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    keys: ["token"],
    httpOnly: true,
    secure: config.PROD ? true : false,
  })
);

// health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("HI");
});
//

app.use("/api", SignInRouter);

app.use("/*", notfoundMiddleware);

app.use(errorMiddleware);

app.listen(config.PORT, () => console.log("Listen on port 4000"));
