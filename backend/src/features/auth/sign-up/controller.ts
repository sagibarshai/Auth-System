import { NextFunction, Request, Response } from "express";
import { NewUserPayload, signUpModel } from "./model";
import { BadRequestError, InternalServerError } from "../../../errors";

interface SignUpRequest extends Request {
  body: NewUserPayload;
}

export const signUpController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const newUser = await signUpModel(req.body);
    if (!newUser) next(BadRequestError([{ message: `User with email ${req.body.email} is already exist.`, field: "body" }]));
    else return res.status(201).send(newUser);
  } catch (err) {
    next(InternalServerError());
  }
};
