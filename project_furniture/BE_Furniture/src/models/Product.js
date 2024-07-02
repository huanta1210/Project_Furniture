import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
      minLength: 3,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      require: true,
      minLength: 1,
    },
    imageProduct: {
      type: String,
      require: true,
    },
    // categoryId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);

export default Product;
