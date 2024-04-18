import { type Request, type Response } from 'express';

export class HabitsController {
  private readonly habits: any[] = [];

  store = (request: Request, response: Response): Response => {
    const { name } = request.body;

    const newHabit = { name };

    this.habits.push(newHabit);

    return response.status(201).json(newHabit);
  };
}
