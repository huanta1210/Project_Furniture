import Joi from "joi";

export const categoriesValidator = Joi.object({
  categoryName: Joi.string().min(3).max(255).optional(),
  slug: Joi.string().required().min(3).max(255),
});

export const categoriesUpdateValidator = Joi.object({
  categoryName: Joi.string().min(3).max(255).optional(),
  slug: Joi.string().min(3).max(255).optional(),
});
