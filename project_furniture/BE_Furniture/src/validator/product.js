import Joi from "joi";

export const productValidation = Joi.object({
  productName: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(1),
  description: Joi.string().max(255),
  stock: Joi.number().required().min(1),
  imageProduct: Joi.string().required(),
  categoriesId: Joi.string().required(),
});

export const productUpdateValidation = Joi.object({
  productName: Joi.string().min(3).max(255).optional(),
  price: Joi.number().min(1).optional(),
  description: Joi.string().max(255).optional(),
  stock: Joi.number().min(1).optional(),
  imageProduct: Joi.string().required(),
  categoriesId: Joi.string().required(),
});
