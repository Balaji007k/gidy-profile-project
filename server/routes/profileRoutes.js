// import express
const express = require("express");

const router = express.Router();

// import controller
const controller = require("../controllers/profileController");

// import auth middleware
const auth = require("../middleware/authMiddleware");


// get profile
router.get("/", auth, controller.getProfile);


// create profile
router.post("/", auth, controller.createProfile);


// update profile
router.put("/", auth, controller.updateProfile);


// endorse skill
router.put("/endorse", auth, controller.endorseSkill);


// export router
module.exports = router;