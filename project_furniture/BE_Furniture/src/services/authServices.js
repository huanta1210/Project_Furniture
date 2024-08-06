import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginSuccessService = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      { _id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "3000h",
      }
    );

    return {
      user,
      accessToken,
      message: accessToken ? "Set token successfull" : "Set token failure",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login auth service");
  }
};
