const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { isAuth } = require("../middleware/Auth");

// Create a new task
router.post("/", isAuth, taskController.createTask);

// Get all tasks for a user
router.get("/:userId", isAuth, taskController.getTasksByUserId);

// Get a single task by ID
router.get("/:taskId", isAuth, taskController.getTaskById);

// Update a task

router.put("/:taskId", isAuth, taskController.updateTask);

router.patch("/changeStatus/:taskId", isAuth, taskController.changeStatus);

router.put("/edit/:taskId", isAuth, taskController.editTask);

router.patch('/byDate', isAuth, taskController.getTasksByStartDate);

// Delete a task
router.delete("/:taskId", isAuth, taskController.deleteTask);

module.exports = router;