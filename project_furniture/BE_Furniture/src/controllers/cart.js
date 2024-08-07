import Cart from "../models/Cart";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res.status(200).json({
      message: "Cart successfully",
      datas: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const createCart = async (req, res) => {
  try {
    const { userId, product, quantity } = req.body;
    if (!product || !product.price || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid product data or quantity" });
    }
    const totalPrice = Number(product.price * quantity);

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            product,
            quantity,
            totalPrice,
          },
        ],
        totalPrice,
      });
    } else {
      const existingItemIndex = cart.items.findIndex((item) =>
        item.product._id.equals(product._id)
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].totalPrice += totalPrice;
      } else {
        cart.items.push({
          product,
          quantity,
          totalPrice,
        });
      }
    }
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    await cart.save();

    return res.status(200).json({
      message: "Created cart successfully",
      datas: cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.product._id === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const priceDifference = item.totalPrice / item.quantity;
    item.quantity = quantity;
    item.totalPrice = quantity * priceDifference;

    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    await cart.save();

    return res
      .status(200)
      .json({ message: "Item saved successfully", datas: cart });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.find({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!Array.isArray(cart[0].items)) {
      return res.status(400).json({ message: "Items field is not an array" });
    }

    const productIndex = cart[0].items.findIndex(
      (item) => item.product._id.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    cart[0].items.splice(productIndex, 1);

    cart.totalPrice = cart[0].items.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    const newCart = await Cart.create(cart);

    if (!newCart) {
      return res.status(403).json({
        message: "Create cart mongoose unsuccessfully",
      });
    }

    return res.status(200).json({
      message: "Product removed from cart successfully",
      data: newCart,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
