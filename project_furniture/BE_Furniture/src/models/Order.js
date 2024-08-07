import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Payment Completed",
      ],
      default: "Pending",
    },
    total: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0,
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
