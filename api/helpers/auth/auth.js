const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const {
  app: { jwtSecret, jwtExpiry, jwtTimeShorthand },
} = _configPath;

const createJwt = async (userData) => {
  const { _id, username, email, profilePicture } = userData;
  let tokenObj = {
    user: {
      _id,
      username,
      email,
      profilePicture,
    },
    secret: jwtSecret,
    expiry: jwtExpiry,
    timeShorthand: jwtTimeShorthand,
  };
  return createToken(tokenObj);
};

const updateJwt = async (oldToken) => {
  const oldTokenData = jwt.decode(oldToken);
  const end = dayjs(oldTokenData.iat);
  const start = dayjs(dayjs().unix());
  const timeDiff = start.diff(end) / 60 / 60; // get time diff in hours
  if (timeDiff > jwtExpiry) {
    // create a userservice to get userdata by id and the use that service here
    const tokenData = {
      user: {
        ...oldTokenData,
        iat: undefined,
        exp: undefined,
      },
    };
    return createToken();
  }
  console.log(timeDiff);
};

const createToken = async (tokenData) => {
  const payLoad = tokenData.user;
  const token = jwt.sign(payLoad, tokenData.secret, {
    expiresIn: `${tokenData.expiry}${tokenData.timeShorthand}`,
  });
  return token;
};

module.exports = { createJwt, updateJwt };
