const LeadNote = require("../models/LeadNote");

// ------------------------------------------------------
// Add a new note to a lead
// ------------------------------------------------------
exports.addLeadNote = async (req, res) => {
    try {
        const { lead, note, addedBy, followUpDate } = req.body;

        const newNote = new LeadNote({
            lead,
            note,
            addedBy,
            followUpDate
        });

        await newNote.save();

        res.status(201).json({
            success: true,
            message: "Lead note added successfully",
            data: newNote
        });
    } catch (error) {
        console.error("Error adding lead note:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


// ------------------------------------------------------
// Get all notes for a specific lead
// ------------------------------------------------------
exports.getNotesByLead = async (req, res) => {
    try {
        const leadId = req.params.leadId;

        const notes = await LeadNote.find({ lead: leadId })
            .populate("addedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notes.length,
            data: notes
        });
    } catch (error) {
        console.error("Error fetching lead notes:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


// ------------------------------------------------------
// Delete a lead note
// ------------------------------------------------------
exports.deleteLeadNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await LeadNote.findByIdAndDelete(noteId);

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead note deleted successfully",
            deletedId: note._id
        });
    } catch (error) {
        console.error("Error deleting lead note:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


// ------------------------------------------------------
// Update a note (optional but useful)
// ------------------------------------------------------
exports.updateLeadNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const updatedNote = await LeadNote.findByIdAndUpdate(
            noteId,
            { $set: req.body },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote
        });
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
