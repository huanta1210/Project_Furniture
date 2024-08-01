import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    facebookId: String,
    userName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: function () {
        return !(this.isGoogleUser || this.isFacebookUser);
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
        return !(this.isGoogleUser || this.isFacebookUser);
      },
    },
    role: {
      type: String,
      default: "member",
    },
    photos: {
      type: String,
      required: function () {
        return !(this.isGoogleUser || this.isFacebookUser);
      },
      default: false,
    },
    provider: String,
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    isFacebookUser: {
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
