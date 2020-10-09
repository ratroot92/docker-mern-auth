const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config({
  path: "./config/config.env",
});
//** Winston Confs  **/
const logger =require('./config/logger')
const connectDB=require('./config/mongoDB')







 const server = express();
 connectDB();





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

/*
! Register Routes Here
*/
server.use(cookieParser());
server.use(cors());
server.use(express.json());
server.use(loggerMiddleWare);
// server.use(bodyParser.urlencoded({ extended: false }));

/*
! Register Routes Here
*/
const userRouter = require("./routes/user.route");
const validateRouter = require("./routes/validate.route");
server.use("/api/user", userRouter);
server.use("/api/validate", validateRouter);

/*
! Register Routes Here
*/
server.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found ",
  });
});



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
