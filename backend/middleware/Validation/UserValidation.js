const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("fullName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .isString()
    .withMessage("Name is not valid!")
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Name must be at least 3 characters long and at most 20 characters long!"
    ),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8, max: 20 })
    .withMessage(
      "Password must be at least 8 characters long and at most 20 characters long!"
    ),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match!");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const errors = result[0].msg;
  res.json({ success: false, message: errors });
};

exports.validateUserSignIn = [
  check("email").trim().isEmail().withMessage("Email is invalid!"),
  check("password").trim().not().isEmpty().withMessage("Password is required!"),
];
