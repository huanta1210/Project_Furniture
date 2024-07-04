import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
      default: "UnCategorized",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: "UnCategorized",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const categories =
  mongoose.model.Categories || mongoose.model("Categories", categoriesSchema);

export default categories;
