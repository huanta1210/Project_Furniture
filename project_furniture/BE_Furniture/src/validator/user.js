import Joi from "joi";

export const userValidator = Joi.object({
  userName: Joi.string().required().min(3).max(255).messages({
    "string.empty": "Không bỏ trống username",
    "any.required": "UserName là bắt buộc",
    "string.min": "Trường username không được dưới {#limit } kí tự",
    "string.max": "Trường username không được quá {#limit + 1 } kí tự",
  }),
  phone: Joi.string().required().messages({
    "string.empty": "Không bỏ trống phone",
    "any.required": "Phone là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Không bỏ trống email",
    "any.required": "Email là bắt buộc",
    "string.email": "Trường email phải đúng định dạng",
  }),
  password: Joi.string()?.required().min(6).max(255).messages({
    "string.empty": "Không bỏ trống password",
    "any.required": "Password là bắt buộc",
    "string.min": "Password ít nhất phải có {#limit} kí tự",
    "string.max": "Password không quá {#limit + 1} kí tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "string.empty": "Không bỏ trống password",
    "any.required": "Password là bắt buộc",
    "string.min": "Password ít nhất phải có {#limit} kí tự",
    "string.max": "Password không quá {#limit + 1} kí tự",
    "any.only": "Mật khẩu không khớp",
  }),
  role: Joi.string(),
});

export const userLoginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Không bỏ trống email",
    "any.required": "Email là bắt buộc",
    "string.email": "Trường email phải đúng định dạng",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Không bỏ trống password",
    "any.required": "Password là bắt buộc",
    "string.min": "Password ít nhất phải có {#limit} kí tự",
    "string.max": "Password không quá {#limit + 1} kí tự",
  }),
});
