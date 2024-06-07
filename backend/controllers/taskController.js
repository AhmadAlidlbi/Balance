// Task controller
const Task = require("../models/Task");
const TaskList = require("../models/TaskList");
const User = require("../models/User");

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, startDate, endDate, userId, taskListId } =
    req.body;
  console.log(req.body);
  try {
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const task = await Task.create({
      title,
      description,
      startDate,
      endDate,
      userId,
    });
    taskList.tasks.push(task);
    await taskList.save();
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
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
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
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.changeStatus = async (req, res) => {
  const taskId = req.params.taskId;
  const { completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.editTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, startDate, endDate, description, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, startDate, endDate, description, completed },
      { new: true }
    );
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  console.log(req.params);
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTasksByStartDate = async (req, res) => {
  const { date, userId } = req.body;
  console.log({ date, userId });
  try {
    const tasks = await Task.find({
      startDate: {
        $gt: new Date(date),
      },
      userId,
    });
    res.json({ success: true, tasks });
  } catch (error) {
    console.error("Error getting tasks by start date:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
