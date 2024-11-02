import { NextFunction, Request, Response } from "express";
import { NewUserPayload, signUpModel } from "./model";
import { BadRequestError, InternalServerError } from "../../../errors";
import { toHash } from "../../../utils/passwords";
import jwt from "jsonwebtoken";

interface SignUpRequest extends Request {
  body: NewUserPayload;
}

export const signUpController = async (req: SignUpRequest, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = toHash(req.body.password);

    const newUser = await signUpModel({ ...req.body, password: hashedPassword });
    if (!newUser) next(BadRequestError([{ message: `User with email ${req.body.email} is already exist.`, field: "body" }]));
    else {
      const token = jwt.sign(newUser, process.env.JWT_KEY!, { expiresIn: "1h" });
      req.session = {
        token,
      };

      res.status(201).send(newUser);
    }
  } catch (err) {
    next(InternalServerError());
  }
};
