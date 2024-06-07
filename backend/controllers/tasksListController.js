const TaskList = require("../models/TaskList");

exports.createTasksList = async (req, res) => {
  const { title, userId } = req.body;
  try {
    if (!title || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Title and userId are required" });
    }
    const taskList = await TaskList.create({
      title,
      userId,
    });
    console.log("TaskList created:", taskList);
    res.status(201).json({ success: true, taskList });
  } catch (error) {
    console.error("Error creating taskList:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTasksListsByUserId = async (req, res) => {
  const userId = req.params.userId;
  console.log("userId:", userId);
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    const taskLists = await TaskList.find({ userId });
    console.log("TaskLists found:", taskLists);
    res.json({ success: true, taskLists });
  } catch (error) {
    console.error("Error getting taskLists:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTasksListById = async (req, res) => {
  const taskListId = req.params.taskListId;
  try {
    const taskList = await TaskList.findById(taskListId).populate("tasks");
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    res.json({ success: true, taskList });
  } catch (error) {
    console.error("Error getting taskList by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateTasksList = async (req, res) => {
  const taskListId = req.params.taskListId;
  const { title } = req.body;
  try {
    const taskList = await TaskList.findByIdAndUpdate(
      taskListId,
      { title },
      { new: true }
    );
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    res.json({ success: true, taskList });
  } catch (error) {
    console.error("Error updating taskList:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteTasksList = async (req, res) => {
  const taskListId = req.params.taskListId;
  try {
    const taskList = await TaskList.findByIdAndDelete(taskListId);
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    res.json({ success: true, message: "TaskList deleted successfully" });
  } catch (error) {
    console.error("Error deleting taskList:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteTask = async (req, res) => {
  const taskListId = req.params.taskListId;
  const taskId = req.params.taskId;
  console.log({
    taskListId,
    taskId,
  });

  try {
    const taskList = await TaskList.findById(taskListId).populate("tasks");
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    const filteredTasks = taskList.tasks.filter(
      (task) => task._id.toString() !== taskId
    );
    
    taskList.tasks = filteredTasks;
    await taskList.save();

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting taskList:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addTaskToTasksList = async (req, res) => {
  const taskListId = req.params.taskListId;
  const { title, description, startDate, endDate, completed } = req.body;
  try {
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    const task = await taskList.tasks.create({
      title,
      description,
      startDate,
      endDate,
      completed,
    });
    taskList.tasks.push(task);
    await taskList.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error("Error adding task to taskList:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getTaskFromTasksList = async (req, res) => {
  const taskListId = req.params.taskListId;
  const taskId = req.params.taskId;
  try {
    const taskList = await TaskList.findById(taskListId);
    if (!taskList) {
      return res
        .status(404)
        .json({ success: false, message: "TaskList not found" });
    }
    const task = taskList.tasks.id(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, task });
  } catch (error) {
    console.error("Error getting task from taskList:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
