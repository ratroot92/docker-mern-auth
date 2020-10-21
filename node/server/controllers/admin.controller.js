const db = require("../config/sequelize.config");
const con = require("../config/mysqlcon");
const request=require('request');
// const axios=require('axios');
var convert = require('xml-js');
  
var jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// const tt=require('../config/mysqlcon')
signToken = user => {
  return jwt.sign(
    {
      iss: "KHG",
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    keys.jwt_secret
  );
};

//Request = post
//Creating admin
exports.addAdmin = (req, res) => {

  var a=req.body;
  con.query(' INSERT INTO `tblcpdlogins` (`UserName`, `email`, `engid`, `number`,`CNIC`) VALUES("'+a.UserName+'","'+a.email+'","'+a.engid+'","'+a.number+'","'+a.cnic+'") ',((err,data)=>{
   if(err){
      console.log("error select");
    }else{
    res.send(data);
    console.log(data);
    }
    }));
};
exports.engineeridcheck = (req, res) => {
    con.query('SELECT email FROM tblcpdlogins where email="'+req.body.email+'"  ',((err,data)=>{
    // (err)?console.log("error select",err):res.send(data);
    if(err){
      console.log("error select",err);
    }else{
    res.send(data);
    }
    }));

};
exports.engContain = (req, res) => {
    con.query('SELECT engid FROM tblcpdlogins where engid="'+req.body.engid+'" limit 830',((err,data)=>{
    // (err)?console.log("error select",err):res.send(data);
    if(err){
      console.log("error select",err);
    }else{
    res.send(data);
    }
    }));

};
exports.engLimit = (req, res) => {
    con.query('SELECT * from tblcpdlogins limit 830',((err,data)=>{
    if(err){
      console.log("error select");
    }else{
    res.send(data);
    }
    }));

};

//Request = get
//View admins
exports.peclogin =(req,res)=>{
//  console.log("db call PEC login");

  var options = {
    'method': 'POST',
    'url': 'https://supervisory.pec.org.pk/DataService.asmx/engineerLogin',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      'cnic': req.body.cnic,
      'password': req.body.password
    }
  };
  request(options, function (error, response) { 
    // if (error) console.log("this is error in peclogin");
    // res.send(response.body);
  //  console.log(response);
  // if(response.body !="" && response.body !="undefined" && response.body !="null"){ }

        if (error) {
          console.log("error in peclogin");
        } else {
          var xml =response.body;
         // console.log("db call PEC response",response.body);

          // var result1 = convert.xml2json(xml, {compact: true, spaces: 4});
          var result2 = convert.xml2js(xml, {compact: true, spaces: 2});
          // console.log(result2);
          // console.log(JSON.stringify(result2));
          var a=result2.string._text;
          res.send(a);

        }
  });

}
exports.engineerid=(req,res)=>{
   var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://supervisory.pec.org.pk/DataService.asmx/engineerInformation',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'engineerId': req.body.engineerId,
      }
    };
    request(options, function (error, response) { 
      // if (error) throw new Error("this is error in engineerid");
      // res.send(response.body);
      if (error) {
        console.log("error in engineerid");
      } else {
        let xml =response.body;
        let result2 = convert.xml2js(xml, {compact: true, spaces: 2});
        let a=result2.string._text;
        res.send(a);
      }
    });
}
exports.viewAdmin = (req, res) => {
   con.query('SELECT * from tblcpdlogins',((err,data)=>{
    if(err){
      console.log("error select");
    }else{
    res.send(data);
    }
    }));
};


