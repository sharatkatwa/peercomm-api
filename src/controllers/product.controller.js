import asyncHandler from "../utils/asyncHandler.js";
import ProductModel from "../models/product.model.js";
import { uploadToImagekit } from "../config/imageKit.js";
import mongoose, { mongo } from "mongoose";
import appError from "../utils/appError.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  const user = req.user;

  // Upload each in-memory multer file to ImageKit before storing product data.
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

  // Return seller contact basics with the newly created product response.
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

  // Build a case-insensitive category filter only when the query param exists.
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

// Get products created by the logged-in user.
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

  // Stop early if the route param cannot be used as a MongoDB ObjectId.
  if (!mongoose.Types.ObjectId.isValid())
    throw new appError(400, "invalid product id");

  const product = await ProductModel.findById(id).populate("seller", "name");
  if (!product) throw new appError(404, "Product not found");

  return res
    .status(200)
    .json({ message: "Product found successfully", product });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  const { id } = req.params;

  // Validate the id before doing uploads or database work.
  if (!mongoose.Types.ObjectId.isValid())
    throw new appError(400, "invalid product id");

  // New images are optional; when present, they replace the old image list.
  const images = [];
  if (req.files.length > 0) {
    images = await Promise.all(
      req.files.map((file) => uploadToImagekit(file, user._id)),
    );
  }
  const product = await ProductModel.findById(id);
  if (!product) throw new appError(404, "product not found");

  product.name = name;
  product.description = description;
  product.price = price;
  product.category = category;
  if (images.length > 0) product.images = images;

  await product.save();

  return res
    .status(200)
    .json({ message: "product updated successfully", product });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check the id format before looking up the product.
  if (!mongoose.Types.ObjectId.isValid())
    throw new appError(400, "invalid prodcut ID");

  const product = await ProductModel.findById(id);
  if (!product) throw new appError(404, "Product not found");

  await ProductModel.findByIdAndDelete(id);
  return res.status(200).json({ message: "product deleted successfully" });
});

export {
  createProduct,
  getAllProducts,
  getMyProdcuts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
