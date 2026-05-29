import asyncHandler from "../utils/asyncHandler.js";
import ProductModel from "../models/product.model.js";

const createProduct = asyncHandler(async (req, res) => {});
const getAllProdcuts = asyncHandler(async (req, res) => {});
const getSingleProduct = asyncHandler(async (req, res) => {});
const updateProduct = asyncHandler(async (req, res) => {});
const deleteProduct = asyncHandler(async (req, res) => {});

export {
  createProduct,
  getAllProdcuts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
