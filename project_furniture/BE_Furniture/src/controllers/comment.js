import Comment from "../models/Comment";
import { commentUpdateValidator, commentValidator } from "../validator/comment";
import User from "../models/User";
import Product from "../models/Product";

export const getAllComments = async (req, res) => {
  try {
    const comment = await Comment.find({})
      .populate("userId")
      .populate("productId");

    if (!comment && comment.length === 0) {
      return res.status(404).json({
        message: "Comments is not found",
      });
    }

    return res.status(200).json({
      message: "Get comments successfully",
      datas: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetailComments = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Id is not found",
      });
    }
    return res.status(200).json({
      message: "Get detail comments successfully",
      datas: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createComments = async (req, res) => {
  try {
    const { error } = commentValidator.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((error) => error.message);

      return res.status(400).json({
        message: errorMessage,
      });
    } else {
      const comment = await Comment.create(req.body);

      if (!comment) {
        return res.status(403).json({
          message: "Create comment unsuccessful",
        });
      }

      const newUser = await User.findByIdAndUpdate(
        comment.userId,
        { $addToSet: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );

      if (!newUser) {
        return res.status(403).json({
          message: "User not found",
        });
      }

      const newProduct = await Product.findByIdAndUpdate(
        comment.productId,
        { $addToSet: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );

      if (!newProduct) {
        return res.status(403).json({
          message: "Product not found",
        });
      }

      return res.status(200).json({
        message: "Update comment successfully",
        datas: comment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComments = async (req, res) => {
  try {
    const { error } = commentUpdateValidator.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((error) => error.message);
      return res.status(403).json({
        message: errorMessage,
      });
    } else {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
      });

      if (!comment) {
        return res.status(403).json({
          message: "Update comment unsuccessful",
        });
      }

      const newUser = await User.findByIdAndUpdate(
        comment.userId,
        { $addToSet: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );
      if (!newUser) {
        return res.status(403).json({
          message: "User not found",
        });
      }

      const newProduct = await Product.findByIdAndUpdate(
        comment.productId,
        { $addToSet: { comments: comment._id } },
        { new: true, useFindAndModify: false }
      );

      if (!newProduct) {
        return res.status(403).json({
          message: "Product not found",
        });
      }

      return res.status(200).json({
        message: "Delete comment successfully",
        datas: comment,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(403).json({
        message: "Delete comment unsuccessful",
      });
    }

    const newUser = await User.findByIdAndUpdate(
      comment.userId,
      { $pull: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );
    if (!newUser) {
      return res.status(403).json({
        message: "User not found",
      });
    }

    const newProduct = await Product.findByIdAndUpdate(
      comment.productId,
      { $pull: { comments: comment._id } },
      { new: true, useFindAndModify: false }
    );

    if (!newProduct) {
      return res.status(403).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Delete comment successfully",
      datas: comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
