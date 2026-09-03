import { Router } from 'express';
import { Workout } from '../models/workout.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ title: 1 }).lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});