import Joi from "joi";

export const productValidation = Joi.object({
  productName: Joi.string().required().min(3).max(255),
  price: Joi.number().required().min(1).max(255),
  description: Joi.string().max(255),
  stock: Joi.number().required().min(1),
  imageProduct: Joi.string().required(),
});
