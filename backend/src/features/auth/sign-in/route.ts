import { Router } from "express";
import { signInController } from "./controller";

const router = Router();

router.post("/signIn", signInController);

export { router as SignInRouter };
