const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema(
    {
        name: { type: String, required: true },        
        email: { type: String, required: true },     
        phone: { type: String, required: true },       
        website: { type: String },                     
        gstNumber: { type: String },                  
        address: { type: String, required: true }     
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Company', CompanySchema);
