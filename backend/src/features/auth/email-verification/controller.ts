import { NextFunction, Request, Response } from "express";

import { SelectUnsafeUserModel, UpdateIsVerifyModel } from "../models";
import { BadRequestError } from "../../../errors";

export const emailVerificationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, token } = req.params;
    const unsafeUser = await SelectUnsafeUserModel(Number(id));
    if (!unsafeUser) return next(BadRequestError([{ message: "User not exists", field: "id" }]));

    if (unsafeUser.verificationToken !== token) return next(BadRequestError([{ message: "Invalid verification token" }]));

    await UpdateIsVerifyModel(Number(id));

    res.status(200).send("Account verified successfully!");
  } catch (err) {
    next(err);
  }
};
