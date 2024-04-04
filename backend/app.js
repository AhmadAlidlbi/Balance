const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());

require("./config/db");
const User = require("./models/User");

app.post("/api/register", async (req, res) => {
  //api endpoint
  const user = await User({name: 'John Doe', email: 'ahmedidlbi@hotmail.com', password: '123456'})
  res.json(user);
});

app.post("/api/login", async (req, res) => {
  //api endpoint
  res.send("User logged in successfully!");
});

app.get("/", (req, res) => {
  //api endpoint
  res.send("Welcome to the Balance App!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
