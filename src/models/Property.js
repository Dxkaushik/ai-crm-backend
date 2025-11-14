const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropertySchema = new Schema(
  {
    // 🔗 Linked Project
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },

    // 🏠 Basic Details
    title: { type: String, required: true },
    description: { type: String },

    propertyType: {
      type: String,
      enum: ['Residential', 'Commercial', 'Industrial', 'Agricultural'],
      required: true
    },

    // 🏢 Sub Category (Apartment, Studio, Shop, SCO, etc.)
    subCategory: {
      type: String,
      enum: [
        'Apartment',
        'Studio',
        'Shop',
        'SCO',
        'Industrial Plot',
        'Office Space',
        'Villa',
        'Plot',
        'Other'
      ],
      required: true
    },

    listingType: {
      type: String,
      enum: ['Sale', 'Rent', 'Lease'],
      required: true
    },

    // 💰 Investment Duration (Short / Long Term)
    investmentDuration: {
      type: String,
      enum: ['Short-term', 'Long-term'],
      default: 'Long-term'
    },

    price: { type: Number, required: true },
    size: { type: Number, required: true }, // e.g., sqft or sqm
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    balconies: { type: Number },
    parkingSpaces: { type: Number },

    furnishingStatus: {
      type: String,
      enum: ['Unfurnished', 'Semi-Furnished', 'Fully-Furnished']
    },
    facingDirection: {
      type: String,
      enum: [
        'North',
        'South',
        'East',
        'West',
        'Northeast',
        'Northwest',
        'Southeast',
        'Southwest'
      ]
    },
    floorDetails: { type: String },
    propertyAge: { type: String },
    availableFrom: { type: Date },

    // 📍 Location
    location: {
      area: { type: String },
      address: { type: String },
      pincode: { type: String }
    },

    // 🎯 Amenities (Referenced)
    amenities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Amenity'
      }
    ],

    // 👤 Owner Info
    owner: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String }
    },

    // 📸 Property Images
    propertyImages: [
      {
        imageUrl: { type: String, required: true },
        altText: { type: String }
      }
    ],

    brochures: [
      {
        name: { type: String },
        documentUrl: { type: String, required: true },
        type: { type: String } // e.g., Brochure, Floor Plan, Legal Doc
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);
