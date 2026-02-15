// import express
const express = require("express");
// import cors
const cors = require("cors");

// create express app
const app = express();

// enable cors
const cors = require("cors");

app.use(cors({

origin: [

'http://localhost:5173',

'https://balaji007k.github.io',

'https://api-gidy-profile-project.onrender.com'

],

methods: ["GET","POST","PUT","DELETE"],

credentials: true

}));

// VERY IMPORTANT
app.options("*", cors());

// middleware to accept JSON data
app.use(express.json());

// auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// profile routes
app.use("/api/profile", require("./routes/profileRoutes"));

app.use("/uploads", express.static("uploads"));

// export app
module.exports = app;