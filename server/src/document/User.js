import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async (next) => {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', UserSchema);
