const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

mongoose.model("User", User);
// request to endpoint , endpoint responsible to deal with schema and database

