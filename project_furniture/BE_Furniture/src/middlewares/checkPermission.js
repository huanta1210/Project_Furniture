import jwt from "jsonwebtoken";
import User from "../models/User";

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "You are not logged",
      });
    }

    const decode = jwt.verify(token, "your_jwt_secret");

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
      name: error.name,
      message: error.message,
    });
  }
};
