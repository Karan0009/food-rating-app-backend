const User = require(_pathConst.modelsPath.userModel);
const {
  account: {
    signupSuccess,
    signupFail,
    emailExists,
    emailNotExists,
    usernameExists,
    usernameNotExists,
  },
} = require(_pathConst.filesPath.responseMessages);
const { encryptPassword, decryptPassword } = require(_pathConst.filesPath
  .passEncDec);

const doesEmailExists = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return {
        status: true,
        message: emailExists,
        data: user,
      };
    } else {
      return {
        status: false,
        message: emailNotExists,
        data: user,
      };
    }
  } catch (error) {
    throw error;
  }
};

const doesUsernameExists = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return {
        status: true,
        message: usernameExists,
        data: user,
      };
    } else {
      return {
        status: false,
        message: usernameNotExists,
        data: user,
      };
    }
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    const result = await newUser.save();
    if (result)
      return {
        data: result,
        status: true,
        message: signupSuccess,
      };
    else return { data: result, status: false, message: signupFail };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  doesEmailExists,
  doesUsernameExists,
  createUser,
};
