const bcryptjs = require("bcryptjs");
const {
  account: { loginSuccess, wrngCreds },
} = require(_pathConst.filesPath.responseMessages);

const encryptPassword = async (password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);
    return { hash };
  } catch (error) {
    throw error;
  }
};

const decryptPassword = async ({ password, hash }) => {
  try {
    const isCorrect = await bcryptjs.compare(password, hash);
    if (isCorrect) return { status: true, message: loginSuccess };
    else return { status: false, message: wrngCreds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { encryptPassword, decryptPassword };
