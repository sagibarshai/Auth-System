import express, { Request, Response } from "express";
import { config } from "./config";
import bodyParser from "body-parser";

import cookieSession from "cookie-session";

import { errorMiddleware } from "./middlewares/errors";
import { notfoundMiddleware } from "./middlewares/errors/not-found";
import { authRoutes } from "./features/auth";
import { pgClient } from "./database/init";

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
