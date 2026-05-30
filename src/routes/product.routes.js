import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProdcuts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { productValidators } from "../validators/product.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  productValidators,
  validate,
  createProduct,
);
router.get("/", getAllProducts);
router.get("/my", authMiddleware, getMyProdcuts);
router.get("/:id", getSingleProduct);
router.put("/:id",authMiddleware, updateProduct);
router.delete("/:id",authMiddleware, deleteProduct);

export default router;
