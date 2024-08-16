import Address from "../models/Address";
import User from "../models/User";
import { addressUpdateValidator, addressValidator } from "../validator/address";

export const getAllAddress = async (req, res) => {
  try {
    const address = await Address.findOne({});

    if (!address) {
      return res.status(404).json({
        message: "No data address not found",
      });
    }

    return res.status(200).json({
      message: "Get data address successfully",
      datas: address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetailAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "No data address details not found",
      });
    }

    return res.status(200).json({
      message: "Get data address details successfully",
      datas: address,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createAddress = async (req, res) => {
  try {
    const { error } = addressValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(403).json({
        message: errorMessage,
      });
    } else {
      const address = await Address.create(req.body);

      if (!address) {
        return res.status(403).json({
          message: "Create address unsuccessful",
        });
      }
      const newUser = await User.findByIdAndUpdate(
        address.userId,
        {
          $addToSet: { addresses: address._id },
        },
        { new: true, useFindAndModify: false }
      );

      if (!newUser) {
        return res.status(404).json({
          message: "Update userId unsuccessful",
        });
      }

      return res.status(200).json({
        message: "Create address successful",
        datas: address,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { error } = addressUpdateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errorMessage,
      });
    } else {
      const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
      });

      if (!address) {
        return res.status(403).json({
          message: "Update address unsuccessfully",
        });
      }

      const newUser = await User.findByIdAndUpdate(
        address.userId,
        { addresses: address._id },
        { new: true, useFindAndModify: false }
      );

      if (!newUser) {
        return res.status(403).json({
          message: "Update userId unsuccessfully",
        });
      }

      return res.status(200).json({
        message: "Updated address successfully",
        dates: address,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);

    if (!address) {
      return res.status(404).json({
        message: "Delete address is not found",
      });
    }

    const newUser = await User.findByIdAndUpdate(
      address.userId,
      { $pull: { addresses: address._id } },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    if (!newUser) {
      return res.status(400).json({
        message: "Update user is not found",
      });
    }

    return res.status(200).json({
      message: "Delete address is successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
