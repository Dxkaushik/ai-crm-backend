const mongoose = require('mongoose');

const LeadSourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('LeadSource', LeadSourceSchema);
