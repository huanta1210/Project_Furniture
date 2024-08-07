import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: new mongoose.Schema({
            productName: {
              type: String,
              required: true,
            },
            price: {
              type: Number,
              required: true,
            },
            description: {
              type: String,
            },
            stock: {
              type: Number,
              required: true,
            },
            imageProduct: {
              type: String,
              required: true,
            },
            categoriesId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Categories",
              required: true,
            },
          }),
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
