const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
const passportConfig = require(".././passport/passport");
const userModel = require("./../models/user.model");
const todoModel = require("./../models/todo.model");

/*
! Helpers function
*/
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    {
      expiresIn: "1d",
    } /*
    ! matches ::secretOrKey
*/
  );
};
/*
    ! Register Route
*/

//middleware that is specific to this router
userRouter.use(function timeLog(req, res, next) {
  // console.log(req.headers);
  // console.log("Body :" + req.body);
  console.log(req.body);
  // console.log(req.cookies);
  // console.log(req.secret);
  // console.log(req.signedCookies);

  console.log("Time: ", Date.now());

  next();
});

userRouter.post("/register", (req, res) => {
  const { username, password, role } = req.body;
  userModel.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Error has occurred",
          msgError: true,
          debugErr: err,
        },
      });
    }
    if (user) {
      res.status(400).json({
        message: {
          msgBody: "Username is already taken",
          msgError: true,
          debugErr: user,
        },
      });
    } else {
      const newUser = new userModel({ username, password, role });
      newUser.save((err) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Error while registering user",
              msgError: true,
              debugErr: err,
            },
          });
        } else {
          res.status(201).json({
            message: {
              msgBody: "User account  registered successfully",
              msgError: false,
              debugErr: user,
            },
          });
        }
      });
    }
  });
});
/*
    ! Login Route
*/
userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    console.log(req.body);
    if (req.isAuthenticated()) {
      /*
      ! this object is returned from userSchema.comparePassword methodusing this keyword
      */
      const { _id, username, role } = req.user;
      /*
      ! create JWT token
      */
      const token = signToken(_id);
      /*
      ! HTTP ONLY ==on the client side you cannot touch this cookie using javascript
      ! prevents cross site scripting attacks
      ! SAME SITE == prevents cross site request frogery attack
      */

      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

/*
    ! Logout Route
*/
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("/logout");
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

/*
?  TODO create
*/

userRouter.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name } = req.body;
    console.log(name);
    const todo = new todoModel({ name: name });
    todo.save((err) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "Error while registering todo",
            msgError: true,
            debugErr: err.errors,
          },
        });
      } else {
        //req.user == because spassport adds user object after authtentication adn authroziation
        console.log(req.user);
        req.user.todos.push(todo);
        req.user.save((err) => {
          if (err) {
            res.status(500).json({
              message: {
                msgBody: "Error while registering todo",
                msgError: true,
                debugErr: err,
              },
            });
          } else {
            res.status(200).json({
              message: {
                msgBody: "successfully created  todo",
                msgError: false,
                debugErr: todo,
              },
            });
          }
        });
      }
    });
  }
);

/*
?  TODO create
*/

userRouter.post(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == "admin") {
      res.status(200).json({
        message: {
          msgBody: "you are admin",
          msgError: false,
          debugErr: req.user.role,
        },
      });
    } else {
      res.status(403).json({
        message: {
          msgBody: "user not admin ",
          msgError: true,
          debugErr: req.user.role,
        },
      });
    }
  }
);
/*
? this route is especially for react tomake sure persistence exist
! once we login close browser react forgets so as express server so
@
*/

userRouter.get(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    let todoList = [];
    todoModel.find({}, function (err, todos) {
      todos.forEach(function (todo) {
        todoList.push({ _id: todo._id, name: todo.name });
      });
      res.status(200).json({ isAuthenticated: true, todos: todoList });
    });
  }
);
userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);
module.exports = userRouter;
