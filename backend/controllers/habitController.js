const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  const { title, userId } = req.body;
  try {
    const habit = await Habit.create({
      title,
      userId,
    });
    res.status(201).json({ success: true, habit });
  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getHabitsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const habits = await Habit.find({ userId });
    res.json({ success: true, habits });
  } catch (error) {
    console.error("Error getting habits:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getHabitById = async (req, res) => {
  const habitId = req.params.habitId;
  try {
    const habit = await Habit.findById(habitId);
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    res.json({ success: true, habit });
  } catch (error) {
    console.error("Error getting habit by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateHabit = async (req, res) => {
  const habitId = req.params.habitId;
  const { completed } = req.body;
  console.log(req.body);
  try {
    const habit = await Habit.findByIdAndUpdate(
      habitId,
      { completed },
      { new: true }
    );
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    res.json({ success: true, habit });
  } catch (error) {
    console.error("Error updating habit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.editHabit = async (req, res) => {
  const habitId = req.params.habitId;
  const { title } = req.body;
  try {
    const habit = await Habit.findByIdAndUpdate(
      habitId,
      { title },
      { new: true }
    );
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    res.json({ success: true, habit });
  } catch (error) {
    console.error("Error updating habit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteHabit = async (req, res) => {
  const habitId = req.params.habitId;
  try {
    const habit = await Habit.findByIdAndDelete(habitId);
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }
    res.json({ success: true, message: "Habit deleted successfully" });
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
