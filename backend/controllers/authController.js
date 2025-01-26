const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sharp = require("sharp");

exports.register = async (req, res) => {
  const { fullName, email, password,profession } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  const user = await User({
    fullName,
    email,
    password,
    profession,
  });
  await user.save();
  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user)
    return res.json({
      success: false,
      message: "User not found with the given email!",
    });
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Email or Password does not match!",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter((t) => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
  };

  res.json({ success: true, user, userInfo, token });
};

exports.uploadProfile = async (req, res) => {
  const { user } = req;
  console.log(req.file);
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image file" });
    }
    await User.findByIdAndUpdate(user._id, { avatar: req.file.filename });
    res
      .status(201)
      .json({ success: true, message: "Your profile has updated!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error, try after some time" });
    console.log("Error while uploading profile image", error.message);
  }
};

exports.logOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization failed!",
      });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter((t) => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: "User loged out successfully!" });
  }
};

exports.getProfile = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });
  delete user.tokens;
  const userInfo = {
    fullName: user.fullName,
    email: user.email,
    avatar: user.avatar ? user.avatar : "",
    id: user._id,
    profession: user.profession,
  };
  console.log("User Info", userInfo);
  res.json({ success: true, user: userInfo });
};

exports.changePassword = async (req, res) => {
  const { user } = req;
  const { oldPassword, newPassword } = req.body;
  console.log(req?.body);
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Old password does not match!",
    });

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: "Password successfully changed!" });
};

exports.editProfile = async (req, res) => {
  const { user } = req;
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access!" });

  const { fullName, profession } = req.body;

  await User.findByIdAndUpdate(user._id, { fullName,  profession });

  res.json({ success: true, message: "Profile updated successfully!" });
}

exports.deleteProfileImage = async (req, res) => {
  const { user } = req;
  if (!user)
    return res.status(401).json({ success: false, message: "Unauthorized access!" });

  try {
    await User.findByIdAndUpdate(user._id, { avatar: "" });
    res.status(200).json({ success: true, message: "Profile image deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error, try again later" });
    console.log("Error while deleting profile image", error.message);
  }
};
