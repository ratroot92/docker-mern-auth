const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
});
//#### PRE is custom hook that is called just before the model is being saved  ####
// we use simple function not arrow functin because we want to use (this.passowrd)
//this.password not allowed in arrow function
UserSchema.pre("save", function (next) {
  // if password is modified than  its already hashed
  if (!this.isModified("password")) return next();
  //else
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    } else {
      this.password = passwordHash;
      next();
    }
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      //hashed password and password not matched
      if (!isMatch) {
        return cb(null, isMatch);
      } else {
        //here (this) is whole user object
        return cb(null, this);
      }
    }
  });
};
module.exports = mongoose.model("user", UserSchema);
