import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  cartData: { type: Object, default: {} },
}, {
  minimize: false,
  timestamps: true // adds createdAt and updatedAt
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
