// import profile model
const Profile = require("../models/Profile");
const User = require("../models/User");


// get profile
exports.getProfile = async (req, res) => {

try {

const profile = await Profile.findOne({
user: req.user.id
});

if (!profile) {
return res.status(404).json({
message: "Profile not found"
});
}

const user = await User.findById(req.user.id)
.select("email");

res.json({
...profile.toObject(),
email: user.email
});

}

catch(err){

res.status(500).json({
message: err.message
});

}

};


// create profile
exports.createProfile = async (req, res) => {

  const profile = await Profile.create({

    user: req.user.id,

    name: req.body.name,

    bio: req.body.bio,

    profilePicture: req.body.profilePicture,

    skills: req.body.skills,

    socialLinks: req.body.socialLinks

  });

  if (!profile) {

return res.status(404).json({
message: "Profile not found"
});

}

  res.json(profile);

};


// update profile
exports.updateProfile = async (req, res) => {

try {

const profile = await Profile.findOne({

user: req.user.id

});


// check FIRST
if (!profile) {

return res.status(404).json({

message: "Profile not found"

});

}


// update fields safely

profile.name = req.body.name || profile.name;

profile.bio = req.body.bio || profile.bio;

// profile.profilePicture =
// req.body.profilePicture || profile.profilePicture;

profile.socialLinks = {

linkedin:
req.body.socialLinks?.linkedin ||
profile.socialLinks.linkedin,

github:
req.body.socialLinks?.github ||
profile.socialLinks.github

};


await profile.save();

res.json(profile);

}

catch(err){

res.status(500).json({

message: err.message

});

}

};
exports.uploadProfilePicture = async (req, res) => {

try {

const profile = await Profile.findOne({

user: req.user.id

});

if (!profile) {

return res.status(404).json({

message: "Profile not found"

});

}


// save file path

profile.profilePicture =
`/uploads/profile/${req.file.filename}`;


await profile.save();

res.json(profile);

}

catch (err) {

res.status(500).json({

message: err.message

});

}

};

// ADD NEW SKILL
exports.addSkill = async (req, res) => {

try {

const profile = await Profile.findOne({
user: req.user.id
});

if (!profile) {

return res.status(404).json({
message: "Profile not found"
});

}

const skillName = req.body.name.trim();

if (!skillName) {

return res.status(400).json({
message: "Skill name required"
});

}

// check duplicate skill
const exists = profile.skills.find(
skill => skill.name.toLowerCase() === skillName.toLowerCase()
);

if (exists) {

return res.status(400).json({
message: "Skill already exists"
});

}

// add skill
profile.skills.push({
name: skillName
});

await profile.save();

res.json(profile);

}

catch(err){

res.status(500).json({
message: err.message
});

}

};

// endorse skill
exports.endorseSkill = async (req, res) => {

  try {

    const profile = await Profile.findOne({

      user: req.user.id

    });


    if (!profile)
      return res.status(404).json({ message: "Profile not found" });


    const skill = profile.skills.id(req.body.skillId);


    if (!skill)
      return res.status(404).json({ message: "Skill not found" });


    skill.endorsements += 1;


    await profile.save();


    res.json(profile);

  }

  catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};

// Top skill
// exports.getTopSkill = async (req,res)=>{

// const profile = await Profile.findOne({
// user:req.user.id
// });

// if (!profile) {

// return res.status(404).json({
// message: "Profile not found"
// });

// }

// const topSkill = profile.skills.sort(
// (a,b)=>b.endorsements-a.endorsements
// )[0];

// res.json(topSkill);

// }

exports.getTopSkill = async (req,res)=>{

try{

const profile = await Profile.findOne({
user:req.user.id
});

if(!profile || profile.skills.length===0){

return res.json(null);

}

const topSkill = profile.skills.reduce(
(prev,current)=>
prev.endorsements>current.endorsements?prev:current
);

res.json(topSkill);

}

catch(err){

res.status(500).json({
message:err.message
});

}

}

// delete skill
exports.deleteSkill = async (req, res) => {

  try {

    const profile = await Profile.findOne({
      user: req.user.id
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    // find skill index
    const skillIndex = profile.skills.findIndex(
      skill => skill._id.toString() === req.params.skillId
    );

    if (skillIndex === -1) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    // remove skill
    profile.skills.splice(skillIndex, 1);

    await profile.save();

    res.json(profile);

  }

  catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

};

// add experience
exports.addExperience = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

if (!profile) {

return res.status(404).json({
message: "Profile not found"
});

}

profile.experience.push(req.body);

await profile.save();

res.json(profile);

}

// edit experience
exports.editExperience = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

const exp = profile.experience.id(req.params.expId);

exp.set(req.body);

await profile.save();

res.json(profile);

}

// delete experience
exports.deleteExperience = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

profile.experience.pull(req.params.expId);

await profile.save();

res.json(profile);

}

// add education
exports.addEducation = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

profile.education.push(req.body);

await profile.save();

res.json(profile);

}

// edit education
exports.editEducation = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

const edu = profile.education.id(req.params.eduId);

edu.set(req.body);

await profile.save();

res.json(profile);

}

// delete education
exports.deleteEducation = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

profile.education.pull(req.params.eduId);

await profile.save();

res.json(profile);

}

// update career vision
// exports.updateCareerVision = async (req,res)=>{

// const profile = await Profile.findOne({
// user:req.user.id
// });

// profile.careerVision = req.body.careerVision;

// await profile.save();

// res.json(profile);

// }
exports.updateCareerVision = async (req,res)=>{

try{

const profile = await Profile.findOne({

user:req.user.id

});

profile.careerVision = req.body.careerVision;

await profile.save();

res.json(profile);

}

catch(err){

res.status(500).json({

message: err.message

});

}

};

// toggle dark mode
exports.toggleDarkMode = async (req,res)=>{

const profile = await Profile.findOne({
user:req.user.id
});

profile.darkMode = !profile.darkMode;

await profile.save();

res.json(profile);

}

// add certification
exports.addCertification = async (req,res)=>{
const profile = await Profile.findOne({user:req.user.id});
profile.certifications.push(req.body);
await profile.save();
res.json(profile);
}

// edit certification
exports.editCertification = async (req,res)=>{
const profile = await Profile.findOne({user:req.user.id});
const cert = profile.certifications.id(req.params.certId);
cert.set(req.body);
await profile.save();
res.json(profile);
}

// delete certification
exports.deleteCertification = async (req,res)=>{
const profile = await Profile.findOne({user:req.user.id});
profile.certifications.pull(req.params.certId);
await profile.save();
res.json(profile);
}