import User from "../models/User";
import { userLoginValidator, userValidator } from "../validator/user";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotnev from "dotenv";
import { loginSuccessService } from "../services/authServices";

dotnev.config();
const SECRET_KEY = process.env.JWT_SECRET;

export const getAuth = async (req, res) => {
  try {
    const user = await User.find({});

    if (!user && user.length === 0) {
      return res.status(404).json({
        message: "users is not found",
      });
    }

    return res.status(200).json({
      message: "Get users successfully",
      datas: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { error } = userValidator.validate(req.body, { abortEarly: true });
    console.log(req.body);

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errorMessage,
      });
    } else {
      const userExits = await User.findOne({ email: req.body.email });

      if (userExits) {
        return res.status(400).json({
          message: "Email is already",
        });
      }

      if (!req.body.role) {
        req.body.role = "member";
      }
      if (!req.body.provider) {
        req.body.provider = "WebFurniture";
      }

      const hashPassword = await bcryptjs.hash(req.body.password, 10);

      const user = await User.create({ ...req.body, password: hashPassword });

      user.password = undefined;

      return res.status(200).json({
        message: "Register successful",
        datas: user,
      });
    }
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
        name: errorMessage,
        message: errorMessage,
      });
    } else {
      // ktra emai đã đăng kí hay chưa
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(400).json({
          message: "This email is not registered",
        });
      }
      // giải mã hoá password
      const isPassword = await bcryptjs.compare(
        req.body.password,
        user.password
      );

      if (!isPassword) {
        return res.status(400).json({
          message: "Account password is incorrect",
        });
      }
      // tạo token

      const accessToken = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: 360000,
      });

      user.password = undefined;

      return res.status(200).json({
        message: "Login successful",
        user,
        accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//./auth/userinfo.email
//auth/userinfo.profile

export const authGoogle = async (req, res) => {
  try {
    const { id } = req?.body;

    if (!id) {
      return res.status(400).json({
        message: "Id not found",
      });
    }

    const response = await loginSuccessService(id);

    if (!response) {
      return res.status(400).json({
        message: "Response not found",
      });
    }

    return res.status(200).json({
      message: "Success login successful",
      datas: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const authFacebook = () => {};
