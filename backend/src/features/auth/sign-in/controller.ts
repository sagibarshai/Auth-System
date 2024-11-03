import { NextFunction, Request, Response } from "express";
import { SelectUnsafeUserModel, UpdateLoginModel } from "../models";
import { BadRequestError } from "../../../errors";
import { compereHash } from "../../../utils/passwords";
import { createTokenAndSetCookie, deleteTokenCookie } from "../../../utils/jwt";

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const signInController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const storedUser = await SelectUnsafeUserModel(req.body.email);
    if (!storedUser) next(BadRequestError([{ message: `User with email ${req.body.email} not found`, field: "email" }]));
    else {
      const isPasswordsMatch = compereHash(storedUser.password, req.body.password);
      if (!isPasswordsMatch) {
        deleteTokenCookie(req);
        next(BadRequestError([{ message: "Wrong Credentials" }]));
      } else {
        const safeUser = await UpdateLoginModel(req.body.email);
        createTokenAndSetCookie(safeUser, req);

        res.status(200).send(safeUser);
      }
    }
  } catch (err) {
    next(err);
  }
};
