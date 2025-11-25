const mongoose = require('mongoose');
const { Schema } = mongoose;

const LeadSchema = new Schema(
  {
    stage: {
      type: Schema.Types.ObjectId,
      ref: 'LeadStage',
      required: true,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'LeadStatus',
      required: true,
    },
    source: {
      type: Schema.Types.ObjectId,
      ref: 'LeadSource',
      required: true,
    },
    interestedProperty: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      default: null
    },
    leadScore: {
      type: Number,
      default: 0
    },
    
    leadCategory: {
      type: String,
      enum: ['Hot', 'Warm', 'Cold'],
      required: true,
    },
    leadType: {
      type: String,
      enum: ['Buyer', 'Investor', 'Renter'],
      required: true,
    },

    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    alternateMobile: { type: String },
    email: { type: String },

    state: { type: String },
    city: { type: String },

    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    occupation: { type: String },

    budgetRange: { type: String },

    purposeOfBuying: {
      type: String,
      enum: ['Investment', 'Self-use', 'Weekend Home', 'Rental'],
    },

    preferredTimeToCall: { type: String },
    communicationPreference: {
      type: String,
      enum: ['Call', 'WhatsApp', 'Email'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', LeadSchema);
