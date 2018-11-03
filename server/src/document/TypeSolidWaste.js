import mongoose from 'mongoose';

const TypeSolidWasteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  recyclable: {
    type: Boolean,
    required: true,
  },
  reutilable: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('TypeSolidWaste', TypeSolidWasteSchema);
