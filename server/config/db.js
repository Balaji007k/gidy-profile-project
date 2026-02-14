// import mongoose
const mongoose = require("mongoose");

// function to connect database
const connectDB = async () => {

  try {

    // connect MongoDB using connection string
    await mongoose.connect(process.env.MONGO_URI);

    // success message
    console.log("MongoDB Connected");

  } catch (error) {

    // show error
    console.log(error);

  }

};

// export function
module.exports = connectDB;