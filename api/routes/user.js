const express = require("express");
const router = express.Router();
const authController = require(_pathConst.controllersPath.authController);
const { validator } = require(_pathConst.filesPath.validationHelper);
const { signupSchema, loginSchema } = require(_pathConst.validationSchemas
  .userValidationSchema);

/*
 ** user auth routes
 */

router.post(
  "/login",
  validator({ data: "body", schema: loginSchema }),
  authController.loginHandler
);
router.post(
  "/signup",
  validator({ data: "body", schema: signupSchema }),
  authController.signupHandler
);

module.exports = router;
