// import express
const express = require("express");

// create express app
const app = express();

// middleware to accept JSON data
app.use(express.json());

// auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// profile routes
app.use("/api/profile", require("./routes/profileRoutes"));

// export app
module.exports = app;