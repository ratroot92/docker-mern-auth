const express = require("express");

// const request = require('request');
const axios=require('axios');
const request=require('request');
var querystring = require('querystring');
var http = require('http');
var https = require('https');
var fs = require('fs');
var convert = require('xml-js');


const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Iniitalizing sequlize
var db = require("./config/sequelize.config");

// Cross-Origin Resource Sharing Added

app.use((req, res, next) => {
  // res.append('Access-Control-Allow-Origin', ['*']);
  // res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.append('Access-Control-Allow-Headers', 'Content-Type','application/x-www-form-urlencoded');
  // next();
  res.header('Access-Control-Allow-Origin', ['*']);
  res.header('Access-Control-Allow-Headers','Origin','X-Requested-With', 'Content-Type','application/x-www-form-urlencoded');
  next();
});
app.use(cors());

// JSON and Form url encoded Added
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000
  })
);

// include all routes here
const adminRoutes = require("./routes/admin.routes");
const messageRoute = require("./routes/route.message");

app.use("/admin", adminRoutes);
app.use("/msg", messageRoute);

app.use(cookieParser());
//  api get inside post route test here


app.get('/abc', (req, res) => {
  axios.get('https://joke-api-strict-cors.appspot.com/jokes/random')
    .then((response)=> {
      res.status(200).json({
        status: true,
        message: response.data
      });
    })
    .catch((error) => {
        res.send("eeeeeeeee",error);
    });
})
// app.get('/abc1', (req, res) => {
//  var options = {
//     'method': 'POST',
//     'url': 'http://supervisory.pec.org.pk/DataService.asmx/engineerLogin',
//     'headers': {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//       'cnic': '3740537445617',
//       'password': '03315077789m'
//     }
//   };
//   request(options, function (error, response) { 
//     if (error) throw new Error(error);
//     res.send(response.body);
//   });
//  })

app.get("/test", function(req, res) {
  res.status(200).json({
    status: true,
    message: "Working talha!"
  });






});

module.exports = app;
