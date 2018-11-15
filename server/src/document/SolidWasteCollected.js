import mongoose from 'mongoose';

const SolidWasteCollectedSchema = new mongoose.Schema({
  typeWasted: {
    type: mongoose.Schema.ObjectId,
    ref: 'TypeSolidWaste',
    required: true,
  },
  quantityCollected: {
    type: Number,
    required: true,
  },
  collectionDate: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('SolidWasteCollected', SolidWasteCollectedSchema);
