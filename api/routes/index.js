var express = require("express");
var router = express.Router();
const { apiResponse } = _resHelper;

router.use("/users", require(_pathConst.routesPath.userRoutes));

module.exports = router;
