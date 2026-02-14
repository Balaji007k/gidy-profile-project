// import mongoose
const mongoose = require("mongoose");


// create skill schema
// this schema is used inside profile schema
const skillSchema = new mongoose.Schema({

  // skill name
  name: {

    type: String,

    required: true

  },

  // number of endorsements
  endorsements: {

    type: Number,

    default: 0

  }

});


// create profile schema
const profileSchema = new mongoose.Schema({

  // connect profile to specific user
  user: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User",

    required: true

  },

  // profile name
  name: {

    type: String,

    required: true

  },

  // profile bio
  bio: {

    type: String,

    required: true

  },

  // profile image
  profilePicture: {

    type: String,

    default: ""

  },

  // skills
  skills: [

    skillSchema

  ],

  // social links
  socialLinks: {

    linkedin: {

      type: String,

      default: ""

    },

    github: {

      type: String,

      default: ""

    }

  }

},

{

  // timestamps
  timestamps: true

});


// export model
module.exports = mongoose.model("Profile", profileSchema);