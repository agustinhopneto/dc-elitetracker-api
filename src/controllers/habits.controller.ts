import { type Request, type Response } from 'express';

import { habitModel } from '../models/habit.model';

export class HabitsController {
  store = async (request: Request, response: Response): Promise<Response> => {
    const { name } = request.body;

    const findHabit = await habitModel.findOne({
      name,
    });

    if (findHabit) {
      return response.status(400).json({ message: 'Habit already exists.' });
    }

    const newHabit = await habitModel.create({
      name,
      completedDates: [],
    });

    return response.status(201).json(newHabit);
  };
}
