const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//** Winston Confs  **/
const {transports, createLogger, format} = require('winston');
require('winston-daily-rotate-file');

var infoTransport = new transports.DailyRotateFile({
  filename: 'activity_log-%DATE%.log',
  dirname:'./logs/info/',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});
infoTransport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

var errorTransport = new transports.DailyRotateFile({
  filename: 'activity_log-%DATE%.log',
  dirname:'./logs/debug/',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error'
});

var logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
),
  transports: [
    infoTransport,errorTransport
  ]
});




//################################################################################################//
//################################################################################################//
//################################################################################################//
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/mernauth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  () => {
    console.log("Mongo DB connected");
  }
);
/*
?
 */

 const server = express();
 var loggerMiddleWare = function (req, res, next) {
  const log={
    "originalUrl":req['originalUrl'],
    "host":req['headers']['host'],
    "origin":req['headers']['origin'],
    "method":req['method'],
  }
  logger.error(log)
  next()
}
server.use(loggerMiddleWare);
server.use(cookieParser());
server.use(cors());
server.use(express.json());
// server.use(bodyParser.urlencoded({ extended: false }));

//Page not found
// server.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: "Page not found ",
//   });
// });
/*
! Register Routes Here
*/
const userRouter = require("./routes/user.route");
const validateRouter = require("./routes/validate.route");
server.use("/api/user", userRouter);
server.use("api/validate", validateRouter);
//################################################################################################//
//################################################################################################//
//################################################################################################//

//REQUIRE MODELS
const userModel = require("./models/user.model");
// const userInput = {
//   username: "noob",
//   password: "admin",
//   role: "admin",
// };
// const user = new userModel(userInput);
// user.save((err, document) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(document);
//   }
// });

/*
! Server Startup Settings
*/

const PORT = process.env.APP_SERVER_PORT || "5000";
server.listen(PORT,(err) => {
  if (!err) {
    console.log(`NODE SERVER LISTENING ON PORT ${PORT}`);
  }
  else{
    console.log("***|| Something went wrong while statrting the server ||***")
    console.log(err)
  }
});
