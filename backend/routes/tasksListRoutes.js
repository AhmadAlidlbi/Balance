
const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/Auth");
const tasksListController = require("../controllers/tasksListController");

// Create a new task
router.post("/", isAuth, tasksListController.createTasksList);

// Get all tasks for a user
router.get("/user/:userId", isAuth, tasksListController.getTasksListsByUserId);

// Get a single task by ID
router.get("/:taskListId", isAuth, tasksListController.getTasksListById);

// Update a task
router.put("/:taskListId", isAuth, tasksListController.updateTasksList);

// Delete a task
router.delete("/:taskListId", isAuth, tasksListController.deleteTasksList);

router.delete("/:taskListId/:taskId", isAuth, tasksListController.deleteTask);


module.exports = router;