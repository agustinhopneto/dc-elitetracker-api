import { type Request, type Response } from 'express';
import { z } from 'zod';

import { habitModel } from '../models/habit.model';

export class HabitsController {
  store = async (request: Request, response: Response): Promise<Response> => {
    const schema = z.object({
      name: z.string(),
    });

    const { name } = request.body;

    const habit = schema.safeParse({
      name,
    });

    if (!habit.success) {
      return response.status(400).json({
        message: 'Error on validation.',
      });
    }

    const findHabit = await habitModel.findOne({
      name: habit.data.name,
    });

    if (findHabit) {
      return response.status(400).json({ message: 'Habit already exists.' });
    }

    const newHabit = await habitModel.create({
      name: habit.data.name,
      completedDates: [],
    });

    return response.status(201).json(newHabit);
  };
}
