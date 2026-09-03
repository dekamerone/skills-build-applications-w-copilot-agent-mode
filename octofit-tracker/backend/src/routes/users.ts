import { Router } from 'express';
import { User } from '../models/user.js';

export const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ displayName: 1 }).lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});