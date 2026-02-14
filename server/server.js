// load env file
require("dotenv").config();

// import express app
const app = require("./app");

// import database connection
const connectDB = require("./config/db");

// connect to MongoDB database
connectDB();

// start the server
app.listen(process.env.PORT, () => {

  // show message in console
  console.log("Server running on port " + process.env.PORT);

});