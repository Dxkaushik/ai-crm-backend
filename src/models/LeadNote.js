const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeadNoteSchema = new Schema(
  {
    lead: {
      type: Schema.Types.ObjectId,
      ref: "Lead",   
      required: true
    },

    note: {
      type: String,
      required: true
    },

    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",   
      required: false
    },

    followUpDate: {
      type: Date      
    }
  },
  { timestamps: true } 
);

module.exports = mongoose.model("LeadNote", LeadNoteSchema);
