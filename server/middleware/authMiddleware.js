// import jwt
const jwt = require("jsonwebtoken");


// create auth middleware function
const auth = (req, res, next) => {

  try {

    // get token from header
    const token = req.header("Authorization");


    // check token exists
    if (!token) {

      return res.status(401).json({

        message: "No token, authorization denied"

      });

    }


    // verify token
    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );


    // store user id in request
    req.user = decoded;


    // move to next
    next();

  }

  catch (error) {

    res.status(401).json({

      message: "Invalid token"

    });

  }

};


// export middleware
module.exports = auth;