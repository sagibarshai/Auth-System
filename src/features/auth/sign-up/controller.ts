import { NextFunction, Request, Response } from "express";

export const signUpController = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Pass the body check!");
};
