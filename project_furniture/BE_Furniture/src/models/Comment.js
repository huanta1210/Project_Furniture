import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    commentText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      minLength: 1,
      maxLength: 5,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const comments = mongoose.model("Comment", commentSchema);

export default comments;
