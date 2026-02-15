// import express
const express = require("express");
// import cors
const cors = require("cors");

// create express app
const app = express();

// enable cors
app.use(cors({
    origin: [
        'http://localhost:5173',          // local dev
        'https://balaji007k.github.io'    // GitHub Pages live site
    ],
    credentials: true
}));

// middleware to accept JSON data
app.use(express.json());

// auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// profile routes
app.use("/api/profile", require("./routes/profileRoutes"));

app.use("/uploads", express.static("uploads"));

// export app
module.exports = app;