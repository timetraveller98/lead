import mongoose from "mongoose";
const leadSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    contact: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true,
    }
)

export const leadModelData = mongoose.models.leadDetails || mongoose.model('leadDetails', leadSchema) 