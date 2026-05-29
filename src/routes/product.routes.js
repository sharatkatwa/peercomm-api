import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProdcuts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProdcuts);
router.get("/:id", getSingleProduct);
router.put("/:id", updateProduct);
router.delete("/", deleteProduct);


export default router