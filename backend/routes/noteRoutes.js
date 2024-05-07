// Note routes
const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const { isAuth } = require("../middleware/Auth");

// Create a new note
router.post("/", isAuth, noteController.createNote);

// Get all notes for a user
router.get("/:userId", isAuth, noteController.getNotesByUserId);

// Get a single note by ID
router.get("/:noteId", isAuth, noteController.getNoteById);

// Update a note
router.put("/:noteId", isAuth, noteController.updateNote);

// Delete a note
router.delete("/:noteId", isAuth, noteController.deleteNote);

module.exports = router;
