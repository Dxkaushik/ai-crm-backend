const mongoose = require("mongoose");

const assignedLeadSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Assigned", "Accepted", "In Progress", "Completed", "Rejected"],
      default: "Assigned",
    },
    notes: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssignedLead", assignedLeadSchema);
