const mongoose = require("mongoose");

const siteVisitSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },

    visitDate: {
      type: Date,
      required: true,
    },

    pickupDetails: {
      type: String,
      default: "",
    },

    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    feedback: {
      type: String,
      default: "",
    },

   
    photos: [
      {
        type: String,
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteVisit", siteVisitSchema);
