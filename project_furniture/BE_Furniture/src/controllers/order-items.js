import Order from "../models/Order";
import OrderItem from "../models/Order-items";
import Product from "../models/Product";

export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({})
      .populate("products")
      .populate("orders");

    if (!orderItems || orderItems.length === 0) {
      return res.status(404).json({
        message: "Get all orderItems not found",
      });
    }

    return res.status(200).json({
      message: "Get all orderItems successfully",
      datas: orderItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetailOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findById(req.params.id)
      .populate("products")
      .populate("orders");

    if (!orderItems) {
      return res.status(404).json({
        message: "Get detail orderItems not found",
      });
    }

    return res.status(200).json({
      message: "Get detail orderItems successfully",
      datas: orderItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.create(req.body);

    if (!orderItems) {
      return res.status(403).json({
        message: "Create orderItems unsuccessful",
      });
    }

    return res.status(200).json({
      message: "Create orderItems successfully",
      datas: orderItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateOrderItems = async (req, res) => {
  try {
    console.log(req.body);
    const orderItems = await OrderItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, useFindAndModify: false }
    );

    if (!orderItems) {
      return res.status(404).json({
        message: "Update orderItems unsuccessful",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findByIdAndDelete(req.params.id);

    if (!orderItems) {
      return res.status(404).json({
        message: "Delete orderItems unsuccessful",
      });
    }

    return res.status(200).json({
      message: "Delete orderItems successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
