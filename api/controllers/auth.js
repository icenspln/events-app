const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("[DEBUG]: ", errors.array());
    return res.status(400).json({ success: false, message: "Signup failed!" });
  }

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Signup failed!" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, password: hash });

    return res
      .status(201)
      .json({ success: true, message: "Signup successfull." });
  } catch (err) {
    console.log("Error: " + err.message);
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("[DEBUG]: ", errors.array());
    return res.status(400).json({ success: false, message: "login failed!" });
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user)
      // username not found
      return res
        .status(401)
        .json({ success: false, message: "Check your credentials!" });

    if (!(await bcrypt.compare(password, user.password)))
      // username found but wrong pass
      return res
        .status(401)
        .json({ success: false, message: "Check your credentials!" });

    // Valid username & password
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 1000 * 60 * 60 * 24 }
    );

    return res
      .status(200)
      .json({ success: true, message: "Login successfull.", token });
  } catch (err) {
    console.log("Error: " + err.message);
  }
};

module.exports = { signup, login };
