import Joi from "joi";

export const commentValidator = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  commentText: Joi.string().required(),
  rating: Joi.number().min(1).max(5),
});

export const commentUpdateValidator = Joi.object({
  userId: Joi.string().optional(),
  productId: Joi.string().optional(),
  commentText: Joi.string().optional(),
  rating: Joi.number().min(1).max(5).optional(),
});
