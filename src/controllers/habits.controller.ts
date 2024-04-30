import { type Request, type Response } from 'express';
import { z } from 'zod';

import { habitModel } from '../models/habit.model';
import { buildValidationErrorMessage } from '../utils/build-validation-error-message.util';

export class HabitsController {
  store = async (request: Request, response: Response): Promise<Response> => {
    const schema = z.object({
      name: z.string(),
    });

    const habit = schema.safeParse(request.body);

    if (!habit.success) {
      const errors = buildValidationErrorMessage(habit.error.issues);

      return response.status(422).json({ message: errors });
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

  index = async (request: Request, response: Response) => {
    const habits = await habitModel.find().sort({ name: 1 });

    return response.status(200).json(habits);
  };

  remove = async (request: Request, response: Response) => {
    const schema = z.object({
      id: z.string(),
    });

    const habit = schema.safeParse(request.params);

    if (!habit.success) {
      const errors = buildValidationErrorMessage(habit.error.issues);

      return response.status(422).json({ message: errors });
    }

    const findHabit = await habitModel.findOne({
      _id: habit.data.id,
    });

    if (!findHabit) {
      return response.status(404).json({ message: 'Habit not found.' });
    }

    await habitModel.deleteOne({
      _id: habit.data.id,
    });

    return response.status(204).send();
  };
}
