import Order from "../models/Order";
import OrderItem from "../models/Order-items";
import User from "../models/User";

export const getAllOrders = async (req, res) => {
  try {
    const order = await Order.find({})
      .populate({
        path: "orderItems",
        populate: {
          path: "productId",
        },
      })
      .populate("users");

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

export const getDetailOrders = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: "orderItems",
        populate: {
          path: "productId",
        },
      })
      .populate("users");

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
    if (!req.body.status) {
      req.body.status = "Pending";
    }
    const order = await Order.create(req.body);

    if (!order) {
      return res.status(403).json({
        message: "Create order unsuccessful",
      });
    }
    const newUser = await User.findByIdAndUpdate(
      order.users,
      { $addToSet: { orders: order._id } },
      { new: true }
    );
    if (!newUser) {
      return res.status(403).json({
        message: "Update user unsuccessful",
      });
    }

    const orderItems = req.body.orderItems;
    if (orderItems && orderItems.length > 0) {
      await OrderItem.updateMany(
        { _id: { $in: orderItems } },
        { $set: { orderId: order._id } }
      );
    }

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
    const newUser = await User.findByIdAndUpdate(
      order.users,
      { $addToSet: { orders: order._id } },
      { new: true, useFindAndModify: false }
    );
    if (!newUser) {
      return res.status(403).json({
        message: "Update user unsuccessful",
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
      order.users,
      { $pull: { orders: order._id } },
      { new: true, useFindAndModify: false }
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
