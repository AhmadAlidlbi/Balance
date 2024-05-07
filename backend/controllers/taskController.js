// Task controller
const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, endDate, userId } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      endDate,
      userId,
    });
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all tasks for a user
exports.getTasksByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const tasks = await Task.find({ userId });
    res.json({ success: true, tasks });
  } catch (error) {
    console.error("Error getting tasks:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error getting task by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, endDate, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, endDate, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
