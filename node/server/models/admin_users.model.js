"use strict";

/**
 * User Model
 */

let crypto = require("crypto");

module.exports = function(sequelize, DataTypes) {
  let tblCpdLogin = sequelize.define("tblCpdLogin", {
    UserName: {
      type: DataTypes.STRING
    },
    UserPassword: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    engid: {
      type: DataTypes.STRING
    },
    number: {
      type: DataTypes.STRING
    }
    
  });

  return tblCpdLogin;
};
