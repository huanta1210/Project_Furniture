import Order from "../models/Order";
import OrderItem from "../models/Order-items";
import User from "../models/User";
import { sendConfirmationEmailOrder } from "../configs/send-mail";
import Address from "../models/Address";

export const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate({
        path: "orderItems",
        populate: {
          path: "productId",
        },
      })
      .populate("userId");

    if (order.length === 0) {
      return res.status(403).json({
        message: "Order is empty",
      });
    }

    return res.status(200).json({
      message: "Get order successful",
      datas: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.find({ userId })
      .populate({
        path: "orderItems",
        populate: {
          path: "productId",
        },
      })
      .populate("userId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({
      message: "Order successfully",
      datas: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetailOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: {
          path: "productId",
        },
      })
      .populate("userId");

    if (!order || order.length === 0) {
      return res.status(403).json({
        message: "Order is empty",
      });
    }

    return res.status(200).json({
      message: "Get details order successful",
      datas: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createOrders = async (req, res) => {
  try {
    if (!req.body.paymentStatus) {
      req.body.paymentStatus = "Pending";
    }
    const order = await Order.create(req.body);

    if (!order) {
      return res.status(403).json({
        message: "Create order unsuccessful",
      });
    }
    const newUser = await User.findByIdAndUpdate(
      order.userId,
      { $addToSet: { orders: order._id } },
      { new: true }
    );
    if (!newUser) {
      return res.status(403).json({
        message: "Update user unsuccessful",
      });
    }

    const newOrder = await Address.findByIdAndUpdate(
      order.addressId,
      { $addToSet: { orders: order._id } },
      { new: true }
    );
    if (!newOrder) {
      return res.status(403).json({
        message: "Update order unsuccessful",
      });
    }
    sendConfirmationEmailOrder(order);

    return res.status(200).json({
      message: "Create order successful",
      datas: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateOrders = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({
        message: "Update order unsuccessful",
      });
    }

    return res.status(200).json({
      message: "Update order successful",
      datas: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOrders = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Delete order unsuccessful",
      });
    }
    await OrderItem.updateMany(
      { orderId: order._id },
      { $unset: { orders: "" } }
    );

    const newUser = await User.findByIdAndUpdate(
      order.userId,
      { $pull: { orders: order._id } },
      { new: true }
    );

    if (!newUser) {
      return res.status(403).json({
        message: "Update user unsuccessful",
      });
    }

    return res.status(200).json({
      message: "Delete order successful",
      datas: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
