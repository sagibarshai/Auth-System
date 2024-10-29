import { Router } from "express";
import { signUpRouter } from "./sign-up/route";
import { SignInRouter } from "./sign-in/route";

const router = Router();

router.use("/auth", signUpRouter, SignInRouter);

export { router as authRoutes };
