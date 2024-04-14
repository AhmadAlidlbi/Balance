const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((e) => {
    console.log(e);
  });
