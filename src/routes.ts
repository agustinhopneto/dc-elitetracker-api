import { Router } from 'express';

import packageJson from '../package.json';

export const routes = Router();

const habits = [];

routes.get('/', (request, response) => {
  const { name, description, version } = packageJson;

  return response.status(200).json({ name, description, version });
});

routes.post('/habits', (request, response) => {
  const { name } = request.body;

  const newHabit = { name };

  habits.push(newHabit);

  return response.status(201).json(newHabit);
});
