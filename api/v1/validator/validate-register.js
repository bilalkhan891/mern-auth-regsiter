const { check, validationResult } = require("express-validator");
const validateRegister = [
  check("name", "Name is required!").not().isEmpty(),
  check("email", "Email is required!").isEmail(),
  check("password", "Enter a password more than 6 charactors").isLength({
    min: 6,
  }),
];

module.exports = {
  validateRegister,
  validationResult,
};
