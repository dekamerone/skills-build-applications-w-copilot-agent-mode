import { Router } from 'express';
import { Activity } from '../models/activity.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response, next) => {
  try {
    const activities = await Activity.find().sort({ completedAt: -1 }).lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
});