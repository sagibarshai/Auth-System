import { NextFunction, Request, Response } from "express";
import { SelectUnsafeUserModel, StoredUser, UpdateLastLoginUserModel } from "../models";
import { BadRequestError, InternalServerError } from "../../../errors";
import { compereHash } from "../../../utils/passwords";
import { createToken, deleteTokenCookie, setTokenCookie } from "../../../utils/jwt";

interface SignUpRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const signInController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const storedUser = await SelectUnsafeUserModel(req.body.email);
    if (!storedUser) next(BadRequestError([{ message: "User not found", field: "email" }]));
    else {
      const isPasswordsMatch = compereHash(storedUser.password, req.body.password);
      if (!isPasswordsMatch) {
        deleteTokenCookie(req);
        next(BadRequestError([{ message: "Wrong Credentials" }]));
      } else {
        await UpdateLastLoginUserModel(req.body.email);

        const safeUser: any = storedUser;
        delete safeUser.password;

        const token = createToken(safeUser);
        setTokenCookie(req, token);

        res.status(200).send(safeUser);
      }
    }
  } catch (err) {
    next(err);
  }
};
