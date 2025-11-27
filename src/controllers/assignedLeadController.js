const AssignedLead = require("../models/AssignedLead");
const Lead = require("../models/Lead");
const User = require("../models/User");

// Assign a lead to a user
exports.assignLead = async (req, res) => {
  try {
    const { leadId, userId, notes } = req.body;
    const assignedBy = req.user._id;

    // validate lead
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    // validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // create assignment
    const assignment = await AssignedLead.create({
      lead: leadId,
      assignedTo: userId,
      assignedBy,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Lead assigned successfully",
      assignment,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error assigning lead",
      error: error.message,
    });
  }
};

// Get all assignments for admin/manager
exports.getAllAssignments = async (req, res) => {
  try {
    const data = await AssignedLead
      .find()
      .populate("lead")
      .populate("assignedTo", "name email role")
      .populate("assignedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching assigned leads",
      error: error.message,
    });
  }
};


// Get assigned leads for logged-in user
exports.getMyAssignedLeads = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await AssignedLead
      .find({ assignedTo: userId })
      .populate("lead")
      .populate("assignedBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your assigned leads",
      error: error.message,
    });
  }
};
