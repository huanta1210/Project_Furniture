import mongoose from "mongoose";

const userPlatfromSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    displayName: {
      type: String,
    },
    emails: {
      type: String,
    },
    photos: {
      type: String,
    },
    provider: {
      type: String,
    },
    userId: {
      type: Number,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("UserPlatfrom", userPlatfromSchema);
