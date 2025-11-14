// src/models/Amenity.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AmenitySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String }, 
    description: { type: String } 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Amenity', AmenitySchema);
