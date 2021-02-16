const { apiResponse } = _resHelper;
const { createUser, doesEmailExists, doesUsernameExists } = require(_pathConst
  .services.userServices);
const profilePicturePlaceholder =
  _pathConst.imagePlaceholderLinks.profilePlaceholder;
const { encryptPassword, decryptPassword } = require(_pathConst.filesPath
  .passEncDec);
const { createJwt, updateJwt } = require(_pathConst.filesPath.authHelper);

const loginHandler = async (req, res, next) => {
  try {
    if (req.validationErrors) {
      throw new Error(req.validationErrors);
    }
    const { email, password } = req.body;
    const emailResults = await doesEmailExists(email);
    if (!emailResults.status) {
      throw new Error(emailResults.message);
    }
    const passComparisonResult = await decryptPassword({
      password: password,
      hash: emailResults.data.password,
    });
    if (!passComparisonResult.status) throw Error(passComparisonResult.message);
    const userData = emailResults.data;
    userData.password = undefined;
    const token = await createJwt(userData);
    updateJwt(token);
    //console.log(token);

    apiResponse(
      res,
      passComparisonResult.status,
      passComparisonResult.message,
      200,
      userData,
      token
    );
  } catch (error) {
    next(error);
  }
};

const signupHandler = async (req, res, next) => {
  try {
    if (req.validationErrors) {
      throw new Error(req.validationErrors);
    }
    const { username, email, password } = req.body;
    const emailResults = await doesEmailExists(email);
    const usernameResults = await doesUsernameExists(username);
    if (emailResults.status || usernameResults.status) {
      if (emailResults.status) {
        throw new Error(emailResults.message);
      } else {
        throw new Error(usernameResults.message);
      }
    }
    const { hash } = await encryptPassword(password);

    const userData = {
      username,
      email,
      password: hash,
      profilePicture: profilePicturePlaceholder,
    };
    const { data, status, message } = await createUser(userData);
    apiResponse(res, status, message, 200, data, null);
  } catch (error) {
    next(error);
  }
};

module.exports = { loginHandler, signupHandler };
