const mongoose = require('mongoose');

const { Schema } = mongoose;

const AmenitySchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String } 
});


const ImageSchema = new Schema({
    imageUrl: { type: String, required: true },
    altText: { type: String }
});


const DocumentSchema = new Schema({
    name: { type: String, required: true },
    documentUrl: { type: String, required: true },
    type: { type: String } 
});

const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        developer: { type: String, required: true },
        location: { type: String },
        city: { type: String },
        state: { type: String },
        propertyType: { type: String },
        totalUnits: { type: Number },
        availableUnits: { type: Number },
        minPrice: { type: Number },
        maxPrice: { type: Number },
        possessionDate: { type: Date },
        description: { type: String },
        highlights: { type: String },
        specifications: { type: String },
        amenities: [AmenitySchema],
        projectImages: [ImageSchema],
        documents: [DocumentSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', ProjectSchema);
