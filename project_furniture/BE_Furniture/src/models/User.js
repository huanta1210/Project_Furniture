import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: function () {
        return !this.isGoogleUser;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
    },
    role: {
      type: String,
      default: "member",
    },
    photos: {
      type: String,
    },
    provider: String,
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
