exports.apiResponse = (
  res,
  status = true,
  message = "",
  code = 200,
  data = {},
  token = "",
  apiVersion = ""
) => {
  const resModel = {
    meta: {
      status: status ? status : false,
      message: message ? message : "",
      code: code ? code : 200,
      token: token ? token : "",
      apiVersion: apiVersion ? apiVersion : apiVersion_,
    },
    responseData: data ? data : {},
  };
  res.status(code).json(resModel);
};
