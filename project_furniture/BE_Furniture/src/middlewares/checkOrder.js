import Order from "../models/Order";

export const checkUserOrder = async (req, res, next) => {
  const { userId: paramId } = req.params;
  const userId = req.user?._id;

  if (userId !== paramId) return res.sendStatus(403);
  try {
    const order = await Order.findOne({ userId });
    if (!order) return res.sendStatus(404);

    req.order = order;
    next();
  } catch (error) {
    console.error(error);
  }
};
