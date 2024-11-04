import { NextFunction, Request, Response } from "express";
import { deleteTokenCookie, verifyToken } from "../../utils/jwt";

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.session?.token;

  if (!token) {
    req.currentUser = undefined;
    deleteTokenCookie(req);
  } else {
    const safeUser = verifyToken(token);
    if (safeUser) req.currentUser = safeUser;
  }
  next();
};
