const mongoose = require("mongoose");

const leadMOMSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    meetingDateTime: {
      type: Date,
      required: true,
    },
    attendees: [
      {
        type: String,
        required: true,
      }
    ],
    agenda: {
      type: String,
      required: true,
    },
    discussion: {
      type: String,
      default: "",
    },
    actionItems: {
      type: String,
      default: "",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeadMOM", leadMOMSchema);
