import Categories from "../models/Categories";
import OrderItem from "../models/Order-items";
import Product from "../models/Product";
import mongoose from "mongoose";
import {
  productUpdateValidation,
  productValidation,
} from "../validator/product";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({}).populate("categoriesId");

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
    const { error } = productValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(404).json({
        message: errorMessage,
      });
    }
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

    if (!newProduct) {
      return res.status(404).json({
        message: "Create categories an unsuccessful product",
      });
    }

    return res.status(200).json({
      message: "Product create is successfully",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { error } = productUpdateValidation.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);
      return res.status(404).json({
        name: errorMessage.name,
        message: errorMessage.message,
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
    const { id } = req.params;
    const productDelete = await Product.findById(id);
    console.log(productDelete);
    if (!productDelete) {
      throw new Error("Không tồn tại id xoá");
    }
    const product = await Product.deleteOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
    });
    if (!product) {
      return res.status(404).json({
        message: "Product delete unsuccessful",
      });
    }

    const categories = await Categories.findById(productDelete.categoriesId);
    if (!categories) {
      return res.status(404).json({
        message: "Delete categories an unsuccessful product",
      });
    }

    const updatedCategory = await Categories.findByIdAndUpdate(
      productDelete.categoriesId,
      { $pull: { products: id } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedCategory) {
      return res.status(500).json({ message: "Failed to update the category" });
    }

    return res.status(200).json({
      message: "Product delete successfully",
      datas: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
