const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User_Schema = mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  google_user: {
    type: Boolean,
    require: true,
  },
  imgurl: {
    type: String,
  },
});

User_Schema.statics.generateAuthToken = async function (_id) {
  try {
    const generate_auth_token = await jwt.sign(
      { _id },
      process.env.SECRET_KEY,
      {
        expiresIn: "15",
      }
    );
    return generate_auth_token;
  } catch (error) {
    res.send(error);
  }
};

User_Schema.statics.generateCookie = async function (req, res, token) {
  try {
    const cookieOptions = {
      sameSite: "strict",
      path: "/",
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
      secure: true,
    };
    const cookie = res
      .cookie("authorization", token, cookieOptions)
      .status(201);
    return cookie;
  } catch (err) {
    res.send(err);
  }
};

const User_Model = new mongoose.model("users", User_Schema);

module.exports = User_Model;
