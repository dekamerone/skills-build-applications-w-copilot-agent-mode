import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    displayName: { type: String, required: true, trim: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);