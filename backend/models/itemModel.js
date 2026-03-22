// models/itemModel.js
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    creationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Creation',
        required: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true, 
        min: 0
    },
    rate: {
        type: Number,
        required: true,
        min: 0
    },
    totalAmount: {
        type: Number,
    },
   
    date: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
});


const Item = mongoose.model('Item', itemSchema);
export default Item;