const { check, validationResult } = require("express-validator");

const validateAuth = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a password!").not().isEmpty(),
];

module.exports = { validateAuth, validationResult };
