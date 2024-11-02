import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SafeUser } from "../../features/auth/sign-up/model";
import { UnAuthorizedError } from "../../errors";

declare global {
  namespace Express {
    interface Request {
      currentUser?: SafeUser;
    }
  }
}

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.token;
  if (!token) next(UnAuthorizedError());
  else {
    jwt.verify(token, process.env.JWT_KEY!, {}, (err, token) => {
      if (err) next(UnAuthorizedError());
      else {
        req.currentUser = token as SafeUser;
        next();
      }
    });
  }
};
