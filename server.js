#!/usr/bin/env node
const http = require("http");
const path = require("path");

/**
 * GLOBAL CONSTANTS
 */
global.appRoot_ = path.resolve(__dirname);
global.apiVersion_ = "0.1";
global._pathConst = require("./api/helpers/constantData/pathConst");
global._configPath = require(_pathConst.filesPath.config);
global._resHelper = require(_pathConst.filesPath.resHelper);

// CONSTANTS
const {
  app: { port: appPort, env },
  dbCreds: { dbUri, dbOptions },
} = _configPath;
const dbContext = require(_pathConst.filesPath.dbContext);
const app = require(_pathConst.filesPath.appJs);

/**
 * Get port from environment and store in Express.
 */
console.log({ env });
var port = normalizePort(appPort || "3000");
//app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * connect to db
 */
dbContext
  .connect()
  .then(() => console.log("db connected"))
  .then(() => server.listen(port)) // Listen on provided port, on all network interfaces.
  .catch((error) => console.log("db error"));

/**
 * server events
 */

server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  if (addr.address === "::") {
    addr.address = "localhost";
  }
  console.log(`server listening on http://${addr.address}:${addr.port}`);
}
