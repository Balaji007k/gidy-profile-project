// import user model
const User = require("../models/User");

// import bcrypt for password hashing
const bcrypt = require("bcryptjs");

// import jwt for token generation
const jwt = require("jsonwebtoken");



//
// @desc Register new user
// @route POST /api/auth/register
//
exports.register = async (req, res) => {

  try {

    // get data from request body
    const { name, email, password } = req.body;


    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({

        message: "User already exists"

      });

    }


    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    // create new user
    const user = await User.create({

      name,

      email,

      password: hashedPassword

    });


    // create JWT token
    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // send response
    res.json({

      message: "User registered successfully",

      token

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};





//
// @desc Login user
// @route POST /api/auth/login
//
exports.login = async (req, res) => {

  try {

    // get email and password
    const { email, password } = req.body;


    // find user
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        message: "Invalid email"

      });

    }


    // compare password
    const isMatch = await bcrypt.compare(

      password,

      user.password

    );

    if (!isMatch) {

      return res.status(400).json({

        message: "Invalid password"

      });

    }


    // generate token
    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // send response
    res.json({

      message: "Login successful",

      token

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};





//
// @desc Logout user
// @route POST /api/auth/logout
//
exports.logout = async (req, res) => {

  try {

    // logout is handled in frontend by deleting token

    res.json({

      message: "Logout successful"

    });

  }

  catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};