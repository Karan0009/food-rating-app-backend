const {
    app: { aesKey, passCode },
  } = _config,
  crypto = require("crypto"),
  algorithmSha = "sha256",
  key = crypto.scryptSync(passCode, "salt", 24),
  iv = Buffer.alloc(16, 0);

exports.encryptPassword = (password) => {
  try {
    let salt = crypto
      .createHmac(algorithmSha, aesKey)
      .update(crypto.randomBytes(8).toString("hex"))
      .digest("hex");
    let cipher = crypto
      .createHmac(algorithmSha, aesKey)
      .update(salt + password)
      .digest("hex");
    // return (`${cipher} ${salt}`);
    return {
      encryptedPass: cipher,
      salt: salt,
    };
  } catch (error) {
    return error;
  }
};
/*
This Function used in sign in 
 it will return the password and salt string
 here salt (saltFromDb) is coming from database and pass (userPassword) from front end
 */
exports.getPasswordAndSaltString = (userPassword, saltFromDb) => {
  try {
    var cipher = crypto
      .createHmac(algorithmSha, aesKey)
      .update(saltFromDb + userPassword)
      .digest("hex");
    return `${cipher} ${saltFromDb}`;
  } catch (error) {
    return error;
  }
};
