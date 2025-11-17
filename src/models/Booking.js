const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // 🔗 Lead Reference
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: false
    },

    // 👤 Customer Details
    fullName: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed", "Other"]
    },
    city: { type: String },
    state: { type: String },

    occupation: { type: String },
    companyName: { type: String }, // not required

    address: { type: String },

    // ⚡ Lead Source Reference
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LeadSource"
    },

    // 🏠 Property Details
    propertyType: { type: String },       // e.g. Residential / Commercial
    purpose: { type: String },            // e.g. Investment, End Use

    developer: {
      type: String 
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    },

    location: { type: String },

    unitNumber: { type: String },
    unitSize: { type: String },
    area: { type: String },

    // 💵 Price Details
    totalPrice: { type: Number, required: true },
    bookingAmount: { type: Number },

    paymentMode: {
      type: String,
      enum: ["Cash", "Cheque", "Online", "Net Banking", "UPI", "Other"],
      required: true
    },

    // 📅 Important Dates
    bookingDate: { type: Date, required: true },
    registrationDate: { type: Date },
    possessionDate: { type: Date },

    // 📌 Booking Status
    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Hold",
        "Completed"
      ],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
