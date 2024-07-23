import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "You are not logged",
      });
    }

    const decode = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(403).json({
        message: "Token error",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You are not allowed to do this",
      });
    }

    next();
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const checkTokenUserComments = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "You are not logged in and cannot comment",
      });
    }

    const decode = jwt.verify(token, SECRET_KEY);

    const userComment = await User.findById(decode._id);

    if (userComment.role === "admin") {
      return res.json({
        message: "You do not have permission to comment",
      });
    }
    next();
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
