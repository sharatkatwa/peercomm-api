import { body } from "express-validator";
import UserModel from "../models/user.model.js";
import appError from "../utils/appError.js";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Name required atleast  3 charecters"),

  body("email")
    .notEmpty()
    .trim()
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw new appError(400, "Email already Exists!");

      return true;
    }),

  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("password contain atleast 6 charecters"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password)
      throw new appError(400, "Passwords do not match");
    return true;
  }),
];

export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("passwrod is required"),
];
