import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: [100, "title can max contain 100 charecters"],
      required: [true, "name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "Electronics",
          "Fashion",
          "Home",
          "Health",
          "Beauty",
          "Sports",
          "Toys",
          "Groceries",
          "Automotive",
          "Books",
          "Others",
        ],
      },
      default:"Others"
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    seller:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    }
  },
  { timestamps: true },
);


const ProductModel = mongoose.model("Product",productSchema)
export default ProductModel