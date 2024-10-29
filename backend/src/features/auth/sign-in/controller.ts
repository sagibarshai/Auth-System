import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../../errors";

export const signInController = (req: Request, res: Response, next: NextFunction) => {
  return next(BadRequestError([{ message: "Some msg", field: "" }]));
};
