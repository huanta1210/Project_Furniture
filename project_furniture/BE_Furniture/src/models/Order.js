import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
    },
    status: {
      type: String,
      default: "Uncomfirmed",
    },
    total: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
orderSchema.pre("save", function (next) {
  if (!this.orderDate) {
    this.orderDate = new Date();
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
