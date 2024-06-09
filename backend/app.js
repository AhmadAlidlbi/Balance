const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const tasksListRoutes = require("./routes/tasksListRoutes");
const noteRoutes = require("./routes/noteRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();

app.use(cors());
app.use(express.json());
// log request  and response data 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// public folder
app.use(express.static("public"));

// Use authentication routes
app.use(authRoutes);

// Use task routes
app.use("/tasks", taskRoutes);
app.use("/tasksList", tasksListRoutes);

// Use note routes
app.use("/notes", noteRoutes);

// Use habit routes
app.use("/habits", habitRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});


app.get("/test", (req, res) => {
  res.send("Test route");
});

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello from the server!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

