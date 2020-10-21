"use strict";

/**
 * User Model
 */

let crypto = require("crypto");

module.exports = function(sequelize, DataTypes) {
  let tbl_message  = sequelize.define("tbl_message", {
    name: {
      type: DataTypes.STRING
    },
    engid: {
      type: DataTypes.STRING
    },
    message: {
      type: DataTypes.STRING
    }
    
  });

  return tbl_message;
};
