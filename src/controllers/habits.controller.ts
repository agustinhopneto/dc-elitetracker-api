import { type Request, type Response } from 'express';

import { habitModel } from '../models/habit.model';

export class HabitsController {
  store = async (request: Request, response: Response): Promise<Response> => {
    const { name } = request.body;

    const newHabit = await habitModel.create({
      name,
      completedDates: [],
    });

    return response.status(201).json(newHabit);
  };
}
