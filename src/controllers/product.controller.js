import asyncHandler from "../utils/asyncHandler.js";
import ProductModel from "../models/product.model.js";
import { uploadToImagekit } from "../config/imageKit.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  const user = req.user;
  // console.log(req.files);
  console.log(user);
  const images = await Promise.all(
    req.files.map((file) => uploadToImagekit(file, user._id)),
  );
  console.log(images);

  return res
    .status(201)
    .json({ message: "Product added successfully", product: req.files });
});
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
