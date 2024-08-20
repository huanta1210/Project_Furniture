import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    street: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    district: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const address = mongoose.model("Address", addressSchema);

export default address;
