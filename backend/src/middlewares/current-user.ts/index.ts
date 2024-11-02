import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SafeUser } from "../../features/auth/models";
import { UnAuthorizedError } from "../../errors";
import { verifyToken } from "../../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      currentUser?: SafeUser;
    }
  }
}

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.token;
  if (!token) req.currentUser = undefined;
  else {
    const safeUser = verifyToken(token);
    if (safeUser) req.currentUser = safeUser;
  }
  next();
};
