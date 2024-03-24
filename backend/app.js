const { log } = require("console");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
app.use(express.json());
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((e) => {
    console.log(e);
  });

require("./models/User");

const User = mongoose.model("User");

app.get("/", (req, res) => {
  //api endpoint
  res.send("Welcome to the Balance App!");
});

app.post("/api/register", async (req, res) => {
  const { name, email, mobile, password } = req.body; // take data from body (destructuring)

  try {
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.send({ data: "User already exists!" });
    }

    await User.create({
      name: name,
      email: email,
      mobile,
      password,
    });
    res.send({ status: "ok", data: "User created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
