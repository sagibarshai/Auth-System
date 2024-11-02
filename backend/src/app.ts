import express, { Request, Response } from "express";
import { config } from "./config";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";

import { errorMiddleware } from "./middlewares/errors";
import { notfoundMiddleware } from "./middlewares/errors/not-found";
import { authRoutes } from "./features/auth";
import { pgClient } from "./database/init";
import "dotenv/config";

const app = express();

if (!process.env.JWT_KEY) {
  throw new Error("PASSWORD_SALT must be define");
}
if (!process.env.COOKIE_SECRET) {
  throw new Error("COOKIE_SECRET must be define");
}

app.use(bodyParser.json());

app.use(
  cookieSession({
    keys: [process.env.COOKIE_SECRET!],
    secure: config.PROD ? true : false,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
    signed: false, // not encrypt the cookie
  })
);

// health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("HI");
});
//

app.use("/api", authRoutes);

app.use("/*", notfoundMiddleware);

app.use(errorMiddleware);

const startUp = async () => {
  try {
    await pgClient.connect();
    console.log("Listen on port 4000");
  } catch (err) {
    console.log("Database connection error ", err);
    process.exit(0);
  }
};

app.listen(config.PORT, startUp);
