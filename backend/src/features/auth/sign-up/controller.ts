import { NextFunction, Request, Response } from "express";
import { NewUserPayload, signUpModel } from "./model";
import { BadRequestError, InternalServerError } from "../../../errors";
import { toHash, compereHash } from "../../../utils/passwords";

interface SignUpRequest extends Request {
  body: NewUserPayload;
}

export const signUpController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const hash = toHash(req.body.password);
    const isEqual = compereHash(hash, req.body.password);

    console.log("isEqual ! ", isEqual);
    const newUser = await signUpModel(req.body);
    if (!newUser) next(BadRequestError([{ message: `User with email ${req.body.email} is already exist.`, field: "body" }]));
    else res.status(201).send(newUser);
  } catch (err) {
    next(InternalServerError());
  }
};
