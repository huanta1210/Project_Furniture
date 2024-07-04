import Categories from "../models/Categories";
import {
  categoriesUpdateValidator,
  categoriesValidator,
} from "../validator/categories";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        message: "Get categories unsuccessfully",
      });
    }

    return res.status(200).json({
      message: "Get categories successfully",
      datas: categories,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const getDetailCategories = async (req, res) => {
  try {
    const categoriesId = await Categories.findById(req.params.id);

    if (!categoriesId) {
      return res.status(404).json({
        message: "Get detail categories unsuccessful",
      });
    }
    return res.status(200).json({
      message: "Get detail categories successfully",
      datas: categoriesId,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const createCategories = async (req, res) => {
  try {
    const { error } = categoriesValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);

      return res.status(400).json({
        name: errorMessage.name,
        message: errorMessage.message,
      });
    }
    if (!req.body.categoryName && !req.body.slug) {
      req.body.categoryName = "UnCategorized";
      req.body.slug = "UnCategorized";
    }
    const data = await Categories.create(req.body);

    if (!data || data.length === 0) {
      return res.status(400).json({
        message: "Create categories unsuccesfull",
      });
    }

    return res.status(200).json({
      message: "Create categories successfull",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const { error } = categoriesUpdateValidator.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessage = error.details.map((err) => err.message);

      return res.status(400).json({
        name: errorMessage.name,
        message: errorMessage.message,
      });
    }

    const data = await Categories.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        message: "Categories update unsuccessful",
      });
    }
    return res.status(200).json({
      message: "Categories update successful",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const data = await Categories.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Delete categories unsuccessful",
      });
    }

    return res.status(200).json({
      message: "Categories delete successful",
      datas: data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
