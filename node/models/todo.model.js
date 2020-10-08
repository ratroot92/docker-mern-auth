const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("todo", todoSchema);
