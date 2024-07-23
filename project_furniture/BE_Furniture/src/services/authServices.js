import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;
export const loginSuccessService = async (id) => {
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      { _id: user._id, name: user.name },
      SECRET_KEY,
      { expiresIn: 360000 }
    );

    return { user, accessToken };
  } catch (error) {
    throw new Error("Failed to login auth service", error);
  }
};
