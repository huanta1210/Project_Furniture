import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      min: 0.01,
      required: true,
    },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default mongoose.model("OrderItem", orderItemsSchema);
