import jwt from "jsonwebtoken";
import appError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler((req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new appError("401", "Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWT_SECET);

  req.user = decoded;
  next();
});
