import { Router } from "express";
import { signUpController } from "./controller";
import { body } from "express-validator";
import { formattedPhoneRegex } from "../../../utils/regex/phone-number";
import { requestValidationMiddleware } from "../../../middlewares/request-validation";

const router = Router();

// id ,first_name, last_name, email, password, register_at, update_at,
// is_verifyd, phone_number

router.post(
  "/signUp",
  body("firstName").isLength({ min: 2, max: 40 }).withMessage("First name should be exist with 2 - 40 characters"),
  body("lastName").isLength({ min: 2, max: 40 }).withMessage("Last name should be exist with 2 - 40 characters"),
  body("email").isEmail().withMessage("Email should be exist and in a valid structure"),
  body("password")
    .isStrongPassword({ minLowercase: 1, minNumbers: 1, minSymbols: 1, minUppercase: 1 })
    .withMessage("Password should contain at least 1 symbol, 1 uppercase, 1 lowercase, 1 number")
    .isLength({ min: 6, max: 30 })
    .withMessage("Password should be exist with 6 - 30 characters"),
  body("phoneNumber")
    .matches(formattedPhoneRegex)
    .withMessage("Phone number must be in this structure : +9725XXXXXXXX")
    .isMobilePhone(["he-IL"], { strictMode: true })
    .withMessage("Phone number must be valid and from Israel"),
  requestValidationMiddleware,
  signUpController
);

export { router as signUpRouter };
