import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema);