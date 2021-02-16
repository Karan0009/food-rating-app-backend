const {
  filesPath: { envFile },
} = _pathConst;
require("dotenv").config({ path: envFile });

const {
  NODE_ENV,
  DEV_APP_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
  JWT_EXPIRY,
  JWT_TIME_SHORTHAND,
} = process.env;

const dev = {
  app: {
    env: NODE_ENV,
    port: DEV_APP_PORT,
    jwtSecret: JWT_SECRET,
    jwtExpiry: JWT_EXPIRY,
    jwtTimeShorthand: JWT_TIME_SHORTHAND,
  },
  dbCreds: {
    dbUsername: DB_USERNAME,
    dbPassword: DB_PASSWORD,
    dbName: DB_NAME,
    dbUri: `mongodb://localhost:27017/${DB_NAME}`,
    dbOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
  },
};

module.exports = dev;
