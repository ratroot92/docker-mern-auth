// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const session = require('express-session');

// const db = require('./sequelize.config');
// const admin = require('../models/admin_users.model');
// const app = require('../../server/index');


// app.use(morgan('combined'));
// app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({ extended: false })) 

// app.use(session({  
//   secret: 'keyboard cat', 
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 100 * 60 * 60 * 24 * 30} 
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(
//     (UserName,UserPassword,done)=>{

//         db.TblTempArchive.findOne({where:{UserName:req.body.UserName,UserPassword:req.body.UserPassword},raw:true}).then((user)=>{
//             if(user==null){
//                 return done(null,false)
//             }
//             if(UserPassword==UserPassword){
//                 return done(null,user)
//             }
//             return done(null,false)
//         })

//     }
// ))

// passport.serializeUser((user,done)=>{
//     done(null,user.id)
// })

// passport.deserializeUser((id,done)=>{
//     db.TblTempArchive.findOne({where:{Id:id}}).then((user)=>{
//         if(user==null){
//             done(new Error('Wrong user id'))
//         }
//         done( null,user)
//     })
// })

// module.exports = passport;