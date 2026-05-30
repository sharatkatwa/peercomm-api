import { validationResult } from "express-validator";
import appError from "../utils/appError.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Convert express-validator results into the app's shared error shape.
    const errorMessages = errors.array().map((err) => err.msg);
    throw new appError(400, errorMessages.join(", "));
  }
  next();
};

export default validate;
