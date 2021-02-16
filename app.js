var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./api/routes/index");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require(_pathConst.filesPath.routes));
app.use("/", (req, res, next) => {
  res
    .status(200)
    .send(
      "<body style='width:100vw;height:100vh;box-sizing:border-box;margin:0;padding:0;'><div style='display:flex;flex-direction:column;justify-content: center;align-items:center;'><h1>Namaste world</h1><br /><h5>This is web api for rateyourfood app</h5></div></body>"
    );
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    success: false,
    error: err,
  });
});

module.exports = app;
