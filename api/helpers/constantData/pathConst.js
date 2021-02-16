exports.filesPath = {
  appJs: appRoot_ + "/app.js",
  routes: appRoot_ + "/api/routes/index.js",
  dbContext: appRoot_ + "/api/helpers/dbHelper.js",
  config: appRoot_ + "/api/helpers/constantData/config.js",
  responseMessages: appRoot_ + "/api/helpers/constantData/responseMessages.js",
  pathConst: appRoot_ + "/api/helpers/constantData/pathConst.js",
  resHelper: appRoot_ + "/api/helpers/resModel/resModel.js",
  validationHelper: appRoot_ + "/api/helpers/validationHelper.js",
  passEncDec: appRoot_ + "/api/helpers/encryptDecryptPassword.js",
  authHelper: appRoot_ + "/api/helpers/auth/auth.js",
  envFile: appRoot_ + "/.env",
};

exports.routesPath = {
  userRoutes: appRoot_ + "/api/routes/user.js",
};

exports.controllersPath = {
  authController: appRoot_ + "/api/controllers/auth.js",
};

exports.modelsPath = {
  userModel: appRoot_ + "/api/models/user.js",
};

exports.validationSchemas = {
  userValidationSchema:
    appRoot_ + "/api/validationSchemas/userValidationSchema.js",
};

exports.services = {
  userServices: appRoot_ + "/api/services/userServices.js",
};

exports.imagePlaceholderLinks = {
  profilePlaceholder: "https://picsum.photos/100",
};
