// import profile model
const Profile = require("../models/Profile");


// get profile
exports.getProfile = async (req, res) => {

  const profile = await Profile.findOne({

    user: req.user.id

  });

  res.json(profile);

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

  res.json(profile);

};


// update profile
exports.updateProfile = async (req, res) => {

  const profile = await Profile.findOneAndUpdate(

    { user: req.user.id },

    req.body,

    { returnDocument: "after" }

  );

  res.json(profile);

};


// endorse skill
exports.endorseSkill = async (req, res) => {

  const profile = await Profile.findOne({

    user: req.user.id

  });

  const skill = profile.skills.find(

    s => s.name === req.body.skill

  );

  skill.endorsements++;

  await profile.save();

  res.json(profile);

};