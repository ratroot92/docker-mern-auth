const request=require('request');
var nodemailer = require('nodemailer');

exports.EMAIL =(req,res)=>{
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
     auth: {
        user: 'peccpd@gmail.com',
        pass: 'waseem1234.1'
      }
    });
    var mailOptions = {
      from: 'peccpd@gmail.com',
      to: req.body.toemail,
      //to:'mohammadtalha163@gmail.com',
      subject:'PEC Login',               //req.body.subject,
      text:'Welcome in CPD Portal. We hope you enjoy these feature and these are helpful in your practicle life.',                             //req.body.text
    //  html: "<b>Hello world?</b>" // html body
    };
   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("error in email");
      } else {
        res.send('Email Send To Your Provided Email'); // + info.response
      }
    });
}



exports.emailSecound=(req,res)=>{
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
     auth: {
        user: 'peccpd@gmail.com',
        pass: 'waseem1234.1'
      }
    });
    var mailOptions = {
      from: 'peccpd@gmail.com',
      to: req.body.toemail,
     // to:'mohammadtalha163@gmail.com',
      subject:'Webinar Registration Confirmation',               //req.body.subject,
   //   text:'Thank you for registering to webinar You have been successfully registered. Please use the link "url" to participate in webinar on 18th February 2020.',                             //req.body.text
     html: 'Thank you for registering for webinar "Self Motivation: A Tool to Gain Peak Performance for Engineers". <b>You have been successfully registered.</b> Please use the link <a href="http://52.86.238.121/Self_Motivation:A_Tool_to_Gain_Peak_Performance_for_Engineers">Self Motivation:A Tool to Gain Peak Performance for Engineers</a> to participate in webinar on 18th February 2020.  	'
     // html body
    };
   transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("error in email");
      } else {
        res.send('Email Send To Your Provided Email'); // + info.response
      }
    });
}































// exports.peclogin =(req,res)=>{
//   var options = {
//     'method': 'POST',
//     'url': 'http://supervisory.pec.org.pk/DataService.asmx/engineerLogin',
//     'headers': {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     form: {
//       'cnic': req.body.cnic,
//       'password': req.body.password
//     }
//   };
//   request(options, function (error, response) { 
//     if (error) throw new Error("this is error");
//         var xml =response.body;
//         var result2 = convert.xml2js(xml, {compact: true, spaces: 2});
//         var a=result2.string._text;
//         res.send(a);
//     });
// }
