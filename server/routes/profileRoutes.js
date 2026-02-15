// import express
const express = require("express");

const router = express.Router();

// import controller
const controller = require("../controllers/profileController");

// import auth middleware
const auth = require("../middleware/authMiddleware");


//profile routes
// get profile
router.get("/", auth, controller.getProfile);

// create profile
router.post("/", auth, controller.createProfile);

// update profile
router.put("/", auth, controller.updateProfile);

const upload = require("../middleware/uploadMiddleware");


router.put(
"/upload-picture",
auth,
upload.single("profilePicture"),
controller.uploadProfilePicture
);


//skill routes
// add skill
router.post("/skill", auth, controller.addSkill);

// DELETE skill
router.delete("/skill/:skillId", auth, controller.deleteSkill);

// endorse skill
router.put("/endorse", auth, controller.endorseSkill);

//top skill
router.get("/top-skill", auth, controller.getTopSkill);


//exprience routes
//add experience
router.post("/experience", auth, controller.addExperience);

//edit experience
router.put("/experience/:expId", auth, controller.editExperience);

//delete experience
router.delete("/experience/:expId", auth, controller.deleteExperience);


//education routes
//add education
router.post("/education", auth, controller.addEducation);

//edit education
router.put("/education/:eduId", auth, controller.editEducation);

//delete education
router.delete("/education/:eduId", auth, controller.deleteEducation);

// career vision route
router.put("/career", auth, controller.updateCareerVision);


// theme toggle route
router.put("/darkmode", auth, controller.toggleDarkMode);


// Certification routes
// ADD certification
router.post("/certification", auth, controller.addCertification);

// EDIT certification
router.put("/certification/:certId", auth, controller.editCertification);

// DELETE certification
router.delete("/certification/:certId", auth, controller.deleteCertification);


// export router
module.exports = router;