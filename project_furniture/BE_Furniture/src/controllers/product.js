import Product from "../models/Product";
import { productValidation } from "../validator/product";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({});

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
    const { errors } = productValidation.validate(req.body);

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
    const { errors } = productValidation.validate(req.body);

    if (errors) {
      const error = errors.map((err) => err.message);
      return res.status(404).json({
        name: error.name,
        message: error.message,
      });
    } else {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!product) {
        return res.status(404).json({
          message: "Product update unsuccessful",
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
