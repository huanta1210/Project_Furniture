import mongoose from "mongoose";

const userPlatfromSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    emails: String,
    photos: String,
    provider: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("UserPlatfrom", userPlatfromSchema);
