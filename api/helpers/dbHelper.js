const mongoose = require("mongoose");
const _config = require(_pathConst.filesPath.config);
const {
  dbCreds: { dbUri, dbOptions },
} = _config;

exports.connect = async function () {
  try {
    const connectDb = await mongoose.connect(dbUri, dbOptions);
    return connectDb;
  } catch (error) {
    throw error;
  }
};
