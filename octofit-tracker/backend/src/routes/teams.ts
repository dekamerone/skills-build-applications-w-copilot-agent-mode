import { Router } from 'express';
import { Team } from '../models/team.js';

export const teamsRouter = Router();

teamsRouter.get('/', async (_request, response, next) => {
  try {
    const teams = await Team.find().sort({ name: 1 }).lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});