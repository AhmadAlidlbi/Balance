const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((e) => {
    console.error("Failed to connect to the database. Error:", e.message);
  });
