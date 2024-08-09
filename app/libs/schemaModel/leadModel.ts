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
    },
    productA: {
        type: Boolean,
        required: false
    },
    productB: {
        type: Boolean,
        required: false
    },
    productC: {
        type: Boolean,
        required: false
    }
},
    {
        timestamps: true,
    }
)

export const leadModelData = mongoose.models.leadDetails || mongoose.model('leadDetails', leadSchema) 