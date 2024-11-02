import { NextFunction, Request, Response } from "express";
import { NewUserPayload, InsertUserModel } from "../models";
import { BadRequestError, InternalServerError } from "../../../errors";
import { toHash } from "../../../utils/passwords";
import jwt from "jsonwebtoken";
import { createToken, setTokenCookie } from "../../../utils/jwt";

interface SignUpRequest extends Request {
  body: NewUserPayload;
}

export const signUpController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = toHash(req.body.password);

    const newUser = await InsertUserModel({ ...req.body, password: hashedPassword });
    if (!newUser) next(BadRequestError([{ message: `User with email ${req.body.email} is already exist.`, field: "body" }]));
    else {
      const token = createToken(newUser);
      setTokenCookie(req, token);

      res.status(201).send(newUser);
    }
  } catch (err) {
    next(err);
  }
};
