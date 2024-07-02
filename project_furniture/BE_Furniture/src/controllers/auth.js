import User from "../models/User";

export const registerUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
