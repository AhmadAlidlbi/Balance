const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const note = await Note.create({
      title,
      description,
      userId,
    });
    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getNotesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const notes = await Note.find({ userId });
    res.json({ success: true, notes });
  } catch (error) {
    console.error("Error getting notes:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getNoteById = async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, note });
  } catch (error) {
    console.error("Error getting note by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, description } = req.body;
  console.log("noteId", req.body);
  console.log("title", title);
  console.log("description", description);
  try {
    const note = await Note.findByIdAndUpdate(
      noteId,
      { title, description },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    console.log("note", note);
    res.json({ success: true, note });
    
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
