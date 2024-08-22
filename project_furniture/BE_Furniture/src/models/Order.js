import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now().toLocaleString(),
    },

    total: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Cancelled",
        "Payment Completed",
        "Delivery Successful",
      ],
      default: "Pending",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
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
