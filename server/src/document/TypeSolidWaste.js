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
  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose
TypeSolidWasteSchema.pre('remove', function (next) {
  try {
    this.model('SolidWasteCollected').remove({
      typeWasted: this._id
    }, next);
    next();
  } catch (error) {
    throw error;
  } finally {
    next();
  }
});

export default mongoose.model('TypeSolidWaste', TypeSolidWasteSchema);
