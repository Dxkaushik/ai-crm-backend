const mongoose = require("mongoose");

const leadCallSummarySchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
      enum: [
        "Completed",
        "Not Answered",
        "Busy",
        "Follow-up Scheduled",
        "Wrong Number",
        "Other"
      ]
    },
    nextAction: {
      type: String,
      default: ""
    },
    callNotes: {
      type: String,
      default: ""
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeadCallSummary", leadCallSummarySchema);
