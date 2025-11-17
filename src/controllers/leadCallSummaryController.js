const LeadCallSummary = require("../models/LeadCallSummary");

// ➤ Create Call Summary
exports.createCallSummary = async (req, res) => {
  try {
    const { lead, duration, outcome, nextAction, callNotes, addedBy } = req.body;

    const newSummary = new LeadCallSummary({
      lead,
      duration,
      outcome,
      nextAction,
      callNotes,
      addedBy
    });

    await newSummary.save();

    res.status(201).json({
      message: "Call summary added successfully",
      data: newSummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating call summary", error });
  }
};

// ➤ Get All Call Summaries for a Lead
exports.getSummariesByLead = async (req, res) => {
  try {
    const summaries = await LeadCallSummary.find({ lead: req.params.leadId })
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching call summaries", error });
  }
};

// ➤ Delete Call Summary
exports.deleteCallSummary = async (req, res) => {
  try {
    await LeadCallSummary.findByIdAndDelete(req.params.id);

    res.json({ message: "Call summary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting call summary", error });
  }
};
