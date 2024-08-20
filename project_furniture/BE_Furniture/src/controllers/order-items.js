import Order from "../models/Order";
import OrderItem from "../models/Order-items";
import Product from "../models/Product";

export const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({})
      .populate("productId")
      .populate("orderId");

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
      .populate("productId")
      .populate("orderId");

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
    const { productId, quantity, orderId } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const total = product.price * quantity;

    const orderItems = await OrderItem.create({
      quantity,
      price: product.price,
      orderId,
      productId,
    });
    if (!orderItems) {
      return res.status(403).json({
        message: "Create orderItems unsuccessful",
      });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const newTotal = (parseFloat(order.total) || 0) + total;
    const newOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $push: { orderItems: orderItems._id },
        $inc: { total: newTotal },
      },
      { new: true }
    );

    if (!newOrder) {
      return res.status(403).json({
        message: "Update order failed",
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
    const orderItems = await OrderItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!orderItems) {
      return res.status(404).json({
        message: "Update orderItems unsuccessful",
      });
    }

    const order = await Order.findById(orderItems.orderId);
    if (order) {
      const total = await OrderItem.aggregate([
        { $match: { orderId: order._id } },
        {
          $group: {
            _id: "$orderId",
            total: { $sum: { $multiply: ["$price", "$quantity"] } },
          },
        },
      ]);

      await Order.findByIdAndUpdate(
        orderItem.orderId,
        { total: total[0]?.total || 0 },
        { new: true }
      );
    }

    return res.status(200).json({
      message: "Order item updated successfully",
      datas: orderItems,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteOrderItems = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);

    if (!orderItem) {
      return res
        .status(404)
        .json({ message: "Delete order item unsuccessful" });
    }

    const order = await Order.findById(orderItem.orderId);
    if (order) {
      const total = await OrderItem.aggregate([
        { $match: { orderId: order._id } },
        {
          $group: {
            _id: "$orderId",
            total: { $sum: { $multiply: ["$price", "$quantity"] } },
          },
        },
      ]);

      await Order.findByIdAndUpdate(
        orderItem.orderId,
        { total: total[0]?.total || 0 },
        { new: true }
      );
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
