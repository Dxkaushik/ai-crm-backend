
const mongoose = require('mongoose');

const LeadStatusSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    icon: { type: String, required: true }, 

    color: { type: String, required: true }, 

    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeadStatus', LeadStatusSchema);
