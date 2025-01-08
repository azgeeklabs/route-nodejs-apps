import mongoose from "mongoose";

// 02. Define the schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Category name must be unique"],
      trim: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: true,
      unique: [true, "Category slug must be unique"],
      trim: true,
      minlength: 3,
      lowercase: true,
    }, // internal operation
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: false, // Adds createdAt
    },
    versionKey: false,
  }
);

// 03. Define the model
export const Category = mongoose.model("Category", categorySchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "categories" by default.
