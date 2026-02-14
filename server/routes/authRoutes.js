// import express
const express = require("express");

const router = express.Router();


// import controller
const authController = require("../controllers/authController");


// register route
router.post("/register", authController.register);


// login route
router.post("/login", authController.login);


// logout route
router.post("/logout", authController.logout);


// export router
module.exports = router;