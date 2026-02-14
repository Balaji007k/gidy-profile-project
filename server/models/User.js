// import mongoose
const mongoose = require("mongoose");

// create user schema
const userSchema = new mongoose.Schema({

  // user name
  name: String,

  // user email
  email: String,

  // user password
  password: String

});

// export user model
module.exports = mongoose.model("User", userSchema);