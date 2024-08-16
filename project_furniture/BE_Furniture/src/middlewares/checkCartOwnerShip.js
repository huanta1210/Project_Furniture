import Cart from "../models/Cart";

export const checkCartOwnerShip = async (req, res, next) => {
  const userId = req.user?._id;
  const { userId: paramId } = req.params;

  if (userId !== paramId) return res.sendStatus(403);
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.sendStatus(404);

    req.cart = cart;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
