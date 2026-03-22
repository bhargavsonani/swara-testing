// import mongoose from "mongoose";

// const creationSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     address: { type: String, required: true },
//     gstno: { type: String, required: true }, 
//     panno: { type: String },
//     state: { type: String, required: true },
// }, {
//     timestamps: true 
// });

// const creation = mongoose.model('Creation', creationSchema); 
// export default creation;


import mongoose from "mongoose";

const creationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { 
        type: String, 
        required: false,  // Changed to false
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    gstno: { type: String, required: true }, 
    panno: { type: String },
    state: { type: String, required: true },
}, {
    timestamps: true 
});

const creation = mongoose.model('Creation', creationSchema); 
export default creation;