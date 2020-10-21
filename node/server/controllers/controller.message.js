const db = require("../config/sequelize.config");
const con = require("../config/mysqlcon");
// const request=require('request');
// const axios=require('axios');
// var convert = require('xml-js');
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

exports.getMessage = (req, res) => {
   con.query('SELECT * from tbl_message',((err,data)=>{
    if(err){
      console.log("error select");
    }else{
   res.send(data);
    }
    }));
};
exports.addmsg = (req, res) => {
    var a=req.body;
   con.query('insert into tbl_message (name,engid,message)values("'+a.name+'","'+a.engid+'","'+a.message+'")',((err,data)=>{
  if(err){
      console.log("error select",err);
    }else{
     res.send(data);
    }
    }));
};
exports.addpecNumber = (req, res) => {
    var a=req.body;
    con.query('select engid from tbl_timer',((err,data)=>{
  if(err){
      console.log("error select",err);
    }else{
     res.send(data);
    }
    }));


    
};
exports.addtimer = (req, res) => {
    var a=req.body;
    con.query('select engid from tbl_timer where engid="'+a.engid+'" ',((err,data)=>{
      if(err){
         console.log("error select",err);
       }else{
        if(data ==null || data==""){
          con.query('insert into tbl_timer (name,engid,timer_start)values("'+a.name+'","'+a.engid+'","'+a.timer_end+'") ',((err,data)=>{
            if(err){
               console.log("error select",err);
             }else{
              res.send(data);
             }
             }));
        }else{
          // con.query('update tbl_timer set timer_end="'+a.timer_end+'" where engid="'+a.engid+'" ',((err,data)=>{
          con.query('update tbl_timer set descpline="'+a.descpline+'",email="'+a.email+'",address="'+a.address+'" where engid="'+a.engid+'" ',((err,data)=>{
            if(err){
               console.log("error select",err);
             }else{
              res.send(data);
             }
             }));
        }


       }
       }));
};


