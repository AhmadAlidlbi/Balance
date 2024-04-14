const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

UserSchema.statics.isThisEmailInUse = async function (email) {
  try {
    const user = await this.findOne({ email });
    if (user) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

module.exports = mongoose.model("User", UserSchema);

// Path: backend/routes/auth.js
