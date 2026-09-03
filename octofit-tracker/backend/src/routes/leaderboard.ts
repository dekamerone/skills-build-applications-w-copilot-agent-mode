import { Router } from 'express';
import { LeaderboardEntry } from '../models/leaderboard.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().sort({ rank: 1 }).lean();
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});