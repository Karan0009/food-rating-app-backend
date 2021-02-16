const joi = require("joi");

module.exports.signupSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).max(15).required(),
  profilePicture: joi.string().optional().allow(null).allow(""),
  //   user_type: joi.string()
  //     .optional()
  //     .allow(null)
  //     .allow("")
  //     .valid("User", "Doctor", "Admin"),
});

module.exports.loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().disallow(""),
});
