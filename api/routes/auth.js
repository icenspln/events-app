const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup",

  [
    body("username").notEmpty().escape(),
    body("password").isLength({ min: 8 }).isStrongPassword(),
  ],
  signup
);

router.get(
  "/login",
  [
    body("username").notEmpty().escape().trim(),
    body("password").isLength({ min: 8 }).isStrongPassword(),
  ],
  login
);

module.exports = router;
