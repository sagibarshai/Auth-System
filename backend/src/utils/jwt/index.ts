import { Request } from "express";
import { SafeUser } from "../../features/auth/models";
import jwt from "jsonwebtoken";

export const createTokenAndSetCookie = (payload: SafeUser, req: Request): string => {
  const token = jwt.sign(payload, process.env.JWT_KEY!, { expiresIn: "1h" });
  setTokenCookie(req, token);
  return token;
};

export const verifyToken = (token: string): SafeUser | undefined => {
  let safeUser: undefined | SafeUser;

  jwt.verify(token, process.env.JWT_KEY!, (err, payload) => {
    if (err) return;
    safeUser = payload as SafeUser;
  });
  return safeUser;
};

export const setTokenCookie = (req: Request, token: string) => {
  req.session = {
    token,
  };
};

export const deleteTokenCookie = (req: Request) => {
  req.session = null; // destroy session
};
