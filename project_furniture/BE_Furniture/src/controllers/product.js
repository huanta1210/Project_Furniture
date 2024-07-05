import Categories from "../models/Categories";
import OrderItem from "../models/Order-items";
import Product from "../models/Product";
import {
  productUpdateValidation,
  productValidation,
} from "../validator/product";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).populate("categoriesId");

    if (products.length === 0) {
      return res.status(400).json({
        message: "Product is unsuccessfully",
      });
    }

    return res.status(200).json({
      message: "Product is successfully",
      datas: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDetailsProduct = async (req, res) => {
  try {
    const productId = await Product.findById(req.params.id);

    if (!productId) {
      return res.status(404).json({
        message: "Product details not found",
      });
    }

    return res.status(200).json({
      message: "Product details is successfully",
      datas: productId,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { errors } = productValidation.validate(req.body, {
      abortEarly: false,
    });

    if (errors) {
      const error = errors.map((err) => err.message);
      return res.status(404).json({
        name: error.name,
        message: error.message,
      });
    } else {
      const data = await Product.create(req.body);

      if (!data) {
        return res.status(404).json({
          message: "Product create not found",
        });
      }

      const newProduct = await Categories.findByIdAndUpdate(data.categoriesId, {
        $addToSet: {
          products: data._id,
        },
      });

      const updateOrderItems = await OrderItem.findByIdAndUpdate(
        data.orderItems,
        { $push: { products: data._id } },
        { new: true, useFindAndModify: false }
      );

      console.log(updateOrderItems);

      if (!updateOrderItems) {
        return res.status(404).json({
          message: "Create orderItems an unsuccessful product",
        });
      }

      if (!newProduct) {
        return res.status(404).json({
          message: "Create categories an unsuccessful product",
        });
      }

      return res.status(200).json({
        message: "Product create is successfully",
        datas: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { errors } = productUpdateValidation.validate(req.body, {
      abortEarly: false,
    });

    if (errors) {
      const error = errors.map((err) => err.message);
      return res.status(404).json({
        name: error.name,
        message: error.message,
      });
    } else {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate("categoriesId");

      if (!product) {
        return res.status(404).json({
          message: "Product update unsuccessful",
        });
      }
      const newProduct = await Categories.findByIdAndUpdate(
        product.categoriesId,
        {
          $addToSet: {
            products: product._id,
          },
        }
      );
      if (!newProduct) {
        return res.status(404).json({
          message: "Create categories an unsuccessful product",
        });
      }

      return res.status(200).json({
        message: "Product update successfully",
        datas: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product delete unsuccessful",
      });
    }
    const newProduct = await Categories.findByIdAndUpdate(
      product.categoriesId,
      {
        $addToSet: {
          products: product._id,
        },
      }
    );
    if (!newProduct) {
      return res.status(404).json({
        message: "Create categories an unsuccessful product",
      });
    }

    return res.status(200).json({
      message: "Product delete successfully",
      datas: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
