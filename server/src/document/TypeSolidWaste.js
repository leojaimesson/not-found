import mongoose from 'mongoose';
import SolidWasteCollected from './SolidWasteCollected';

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
  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TypeSolidWasteSchema.pre('remove', function(next) {
  try {
    SolidWasteCollected.findOneAndDelete({typeWasted: this._id});
  } catch(error) {
    throw error;
  } finally {
    next();
  }
});

export default mongoose.model('TypeSolidWaste', TypeSolidWasteSchema);
