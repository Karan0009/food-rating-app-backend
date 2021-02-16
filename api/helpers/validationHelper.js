function validator({ data, schema }) {
  return (req, res, next) => {
    try {
      let result;
      if (data === "body") {
        result = schema.validate(req.body);
      } else if (data === "query") {
        result = schema.validate(req.query);
      } else if (data === "params") {
        result = schema.validate(req.params);
      } else if (!data) {
        console.log("data has error");
        next(
          new Error(
            "this is problem in arguments of validator function,data is falsy"
          )
        );
        return;
      }
      if (result.error) {
        req.validationErrors = result.error;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { validator };
