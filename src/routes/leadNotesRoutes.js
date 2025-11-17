const express = require("express");
const router = express.Router();
const leadNotesController = require("../controllers/leadNotesController");

// -----------------------------
// Lead Notes Routes
// -----------------------------

// Add a new note
router.post("/", leadNotesController.addLeadNote);

// Get all notes for a specific lead
router.get("/lead/:leadId", leadNotesController.getNotesByLead);

// Update a note
router.put("/:id", leadNotesController.updateLeadNote);

// Delete a note
router.delete("/:id", leadNotesController.deleteLeadNote);

module.exports = router;
