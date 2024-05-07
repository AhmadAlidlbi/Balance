const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const noteRoutes = require("./routes/noteRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Use authentication routes
app.use(authRoutes);

// Use task routes
app.use("/tasks", taskRoutes);

// Use note routes
app.use("/notes", noteRoutes);

// Use habit routes
app.use("/habits", habitRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Test route
app.get("/test", (req, res) => {
  res.send("Test route");
});

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello from the server!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});