const User_Model = require("../models/UsersModel");
const bcrypt = require("bcryptjs");
// <!=============== User ====================>
exports.loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User_Model.findOne({
      $or: [{ email }],
    }).select({
      email: 1,
      first_name: 1,
      last_name: 1,
      password: 1,
      google_user: 1,
      user_role: 1,
      tenantId: 1,
    });

    if (!existingUser) {
      return res
        .status(404)
        .send("Unable to find user. Please check username or password");
    }

    if (existingUser && existingUser.google_user === false) {
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        // Passwords match, send a success response
        const generate_auth_token = await User_Model.generateAuthToken(
          existingUser?._id.toString()
        );
        return res.status(201).send(existingUser);
      } else {
        // Passwords do not match, send an authentication failure response
        return res.status(401).send("Password not matched");
      }
    } else {
      // User signed in through Google, send a different response
      return res.status(404).send("You have signed in through Google");
    }
  } catch (error) {
    // Handle other errors
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
};

exports.createuser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ error: "Incomplete data. All fields are required." });
  }

  const existingUser = await User_Model.findOne({
    $or: [{ email }],
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ error: "User with this email already exists." });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      // Store hash in your password DB.console
      const newUser = new User_Model({
        first_name,
        last_name,
        email,
        password: hash,
        google_user: false,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    });
  });
  // Your logic for creating a user

  // const data = await User_Model.create(req.body);
};
exports.googleeuser = async (req, res) => {
  const { given_name, family_name, email, picture } = req.body;
  const existingUser = await User_Model.findOne({
    $or: [{ email }],
  });
  if (!existingUser) {
    const newUser = new User_Model({
      first_name: given_name,
      last_name: family_name,
      email,
      google_user: true,
      imgurl: picture,
    });

    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  }
  if (existingUser) {
    return res.status(201).send(existingUser);
  }

  // Your logic for creating a user

  // const data = await User_Model.create(req.body);
};
exports.getusers = async (req, res) => {
  const data = await User_Model.find({});
  return res.status(201).send(data);
  // Your logic for creating a user

  // const data = await User_Model.create(req.body);
};
