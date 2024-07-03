import User from "../models/User";
import { userLoginValidator, userValidator } from "../validator/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const { errors } = userValidator.validate(req.body, { abortEarly: true });

    if (errors) {
      const error = errors.details.map((err) => err.message);
      return res.status(400).json({
        name: error.name,
        message: error.message,
      });
    } else {
      const userExits = await User.findOne({ email: req.body.email });

      if (userExits) {
        return res.status(400).json({
          message: "Email is already",
        });
      }
      // mã hoá password
      const hashPassword = await bcryptjs.hash(req.body.password, 10);

      // tạo user trong đb
      const user = await User.create({ ...req.body, password: hashPassword });

      user.password = undefined;

      return res.status(200).json({
        message: "Register successful",
        // token: accessToken,
      });
    }
    // check tồn tại của email
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = userLoginValidator.validate(req.body, {
      abortEarly: true,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(400).json({
        name: errorMessage.name,
        message: errorMessage.message,
      });
    } else {
      // ktra emai đã đăng kí hay chưa
      const checkUserRegister = await User.findOne({ email: req.body.email });

      if (!checkUserRegister) {
        return res.status(400).json({
          message: "This email is not registered",
        });
      }
      // giải mã hoá password
      const isPassword = await bcryptjs.compare(
        req.body.password,
        checkUserRegister.password
      );

      if (!isPassword) {
        return res.status(400).json({
          message: "Account password is incorrect",
        });
      }
      // tạo token

      const accessToken = jwt.sign(
        { _id: checkUserRegister._id },
        "your_jwt_secret",
        { expiresIn: "1h" }
      );

      checkUserRegister.password = undefined;

      return res.status(200).json({
        message: "Login successful",
        checkUserRegister,
        token: accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
