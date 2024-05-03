import { Router } from 'express';

import packageJson from '../package.json';
import { FocusTimeController } from './controllers/focus-time.controller';
import { HabitsController } from './controllers/habits.controller';

export const routes = Router();

const habitsController = new HabitsController();
const focusTimeController = new FocusTimeController();

routes.get('/', (request, response) => {
  const { name, description, version } = packageJson;

  return response.status(200).json({ name, description, version });
});

routes.get('/habits', habitsController.index);

routes.get('/habits/:id/metrics', habitsController.metrics);

routes.post('/habits', habitsController.store);

routes.delete('/habits/:id', habitsController.remove);

routes.patch('/habits/:id/toggle', habitsController.toggle);

routes.post('/focus-time', focusTimeController.store);

routes.get('/focus-time/metrics', focusTimeController.metricsByMonth);
