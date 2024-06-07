const express = require("express");

const router = express.Router();

const {
  register,
  login,
  uploadProfile,
  logOut,
  getProfile,
  changePassword,
  editProfile,
  deleteProfileImage,
} = require("../controllers/authController");
const {
  validateUserSignUp,
  validateUserSignIn,
  userValidation,
} = require("../middleware/Validation/UserValidation");

const { isAuth } = require("../middleware/Auth");

const User = require("../models/User");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const upload = multer({ storage, fileFilter });

router.post("/register", validateUserSignUp, userValidation, register);
router.post("/login", validateUserSignIn, userValidation, login);
router.put('/changePassword', isAuth, changePassword);
router.put('/editProfile', isAuth, editProfile);
router.get("/logout", isAuth, logOut);
router.get("/me", isAuth, getProfile);
router.post("/user/uploadImage", isAuth, upload.single("image"), uploadProfile);
router.delete("/user/deleteImage", isAuth, deleteProfileImage);

module.exports = router;
