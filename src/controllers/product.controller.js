import asyncHandler from "../utils/asyncHandler.js";
import ProductModel from "../models/product.model.js";
import { uploadToImagekit } from "../config/imageKit.js";
import mongoose from "mongoose";
import appError from "../utils/appError.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  const user = req.user;

  const images = await Promise.all(
    req.files.map((file) => uploadToImagekit(file, user._id)),
  );
  const newProduct = await ProductModel.create({
    name,
    description,
    price,
    category,
    images,
    seller: user._id,
  });
  const populateProduct = await ProductModel.findById(newProduct._id).populate(
    "seller",
    "name email",
  );
  return res
    .status(201)
    .json({ message: "Product added successfully", product: populateProduct });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  // category filtring query generation
  const query = {};
  if (category) {
    query.category = { $regex: category, $options: "i" };
  }
  const products = await ProductModel.find(query).populate("seller", "name");

  return res.status(200).json({
    message: "products fetched successfully",
    count: products.length,
    products,
  });
});

// Get products created by logged in users
const getMyProdcuts = asyncHandler(async (req, res) => {
  const products = await ProductModel.find({ seller: req.user._id }).populate(
    "seller",
    "name email",
  );

  res.status(200).json({
    message: "prodcuts fetched successfully",
    count: products.length,
    products,
  });
});
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid())
    throw new appError(400, "invalid product id");

  const product = await ProductModel.findById(id).populate("seller", "name");
  if (!product) throw new appError(404, "Product not found");

  return res
    .status(200)
    .json({ message: "Product found successfully", product });
});
const updateProduct = asyncHandler(async (req, res) => {});
const deleteProduct = asyncHandler(async (req, res) => {});

export {
  createProduct,
  getAllProducts,
  getMyProdcuts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
