const User = require("../models/user");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { username, password } = req.body;

  // sanity check

  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.build({ username: username, password: hash });
    await newUser.save();

    return res.status(201).json({ message: "User created." });
  } catch (err) {
    console.log("Error: " + err.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  // sanity check

  try {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        // JWT
        return res.status(200).json({ message: "User found!", user: user });
      }
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    console.log("Error: " + err.message);
  }
};

module.exports = { signup, login };
