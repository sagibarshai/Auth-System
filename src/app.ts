import express, { NextFunction, Request, request, Response, response } from "express";
import { config } from "./config";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";
import { ErrorPayload, ErrorTypes, InternalServerError, NotFoundError } from "./errors";
import { SignInRouter } from "./features/auth/sign-in/route";

const app = express();

app.use(bodyParser.json());

app.use("/api", SignInRouter);

app.use("/*", (req: Request, res: Response, next: NextFunction) => {
  next(NotFoundError());
});

app.use((error: ErrorPayload, req: Request, res: Response, next: NextFunction) => {
  if (error?.type in ErrorTypes) {
    res.status(error.statusCode).send(error.errors);
  } else {
    console.log("error ", error);
    const err = InternalServerError();
    res.status(err.statusCode).send(err.errors);
  }
});

app.listen(config.PORT, () => console.log("Listen on port 4000"));
