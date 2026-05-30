import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router()

// Register a new account after validating payload and password confirmation.
router.post("/register",registerValidator,validate, register)

// Login validates credentials and sets the auth token cookie.
router.post("/login",loginValidator,validate, login)

export default router
