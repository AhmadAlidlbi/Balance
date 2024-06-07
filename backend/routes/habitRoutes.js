// Habit routes
const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");
const { isAuth } = require("../middleware/Auth");

// Create a new habit
router.post("/", isAuth, habitController.createHabit);

// Get all habits for a user
router.get("/user/:userId", isAuth, habitController.getHabitsByUserId);

// Get a single habit by ID
router.get("/:habitId", isAuth, habitController.getHabitById);

// Update a habit
router.put("/:habitId", isAuth, habitController.updateHabit);

router.patch("/:habitId", isAuth, habitController.editHabit);

// Delete a habit
router.delete("/:habitId", isAuth, habitController.deleteHabit);

module.exports = router;
