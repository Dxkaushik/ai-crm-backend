const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChannelPartnerQuerySchema = new Schema(
    {
        // Personal Details
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternateNumber: { type: String },
        dob: { type: Date },
        maritalStatus: { type: String, enum: ['Single', 'Married', 'Other'] },
        anniversaryDate: { type: Date },

        // Source of query
        source: {
            type: String,
            required: true,
            enum: ['Walk-in', 'Referral', 'Digital', 'Channel Partner', 'Event', 'Social Media']
        },
        referredBy: { type: String },
        campaignName: { type: String },

        // Address
        address: {
            city: { type: String },
            state: { type: String }
        },

        // Professional Details
        professional: { type: String }, 
        company: {
            name: { type: String },
            address: { type: String }
        },

        // Properties Dealing In
        properties: {
            propertyTypes: [{ type: String }], 
            budgetRange: { type: String },     
            preferredLocations: [{ type: String }],
            developer: { type: String },       
            project: { type: String }          
        }
    },
    { timestamps: true } 
);

module.exports = mongoose.model('ChannelPartnerQuery', ChannelPartnerQuerySchema);
