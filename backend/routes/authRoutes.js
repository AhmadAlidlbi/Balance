const express = require("express");

const router = express.Router();

const { register, login, uploadProfile, logOut } = require("../controllers/authController");
const {
  validateUserSignUp,
  validateUserSignIn,
  userValidation,
} = require("../middleware/Validation/UserValidation");
const { isAuth } = require("../middleware/Auth");

const User = require("../models/User");

const multer = require("multer");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const uploads = multer({ storage, fileFilter });

router.post("/register", validateUserSignUp, userValidation, register);
router.post("/login", validateUserSignIn, userValidation, login);
router.get("/logout", isAuth, logOut);
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);

// router.post("/create-task", isAuth, (req, res, next) => {
//     res.json({ success: true, message: "Task created successfully!" });
// });

module.exports = router;
