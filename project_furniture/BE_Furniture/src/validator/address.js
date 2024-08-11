import Joi from "joi";

export const addressValidator = Joi.object({
  userId: Joi.string().required(),
  ward: Joi.string().required().max(100).trim(),
  street: Joi.string().required().max(100).trim(),
  district: Joi.string().required().max(100).trim(),
  city: Joi.string().required().max(100).trim(),
  country: Joi.string().required().max(100).trim(),
});

export const addressUpdateValidator = Joi.object({
  userId: Joi.string().optional(),
  ward: Joi.string().max(100).trim().optional(),
  street: Joi.string().required().max(100).trim(),
  district: Joi.string().max(100).trim().optional(),
  city: Joi.string().max(100).trim().optional(),
  country: Joi.string().max(100).trim().optional(),
});
