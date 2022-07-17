import { Router } from 'express';
import { CreateExerciceController, CreateUserController, GetAllUsersController, GetExerciceLog } from '../controllers/userController';

const userRoutes = Router();

userRoutes
  .post('/', CreateUserController)
  .get('/', GetAllUsersController)
  .post('/:id/exercises', CreateExerciceController)
  .get('/:id/logs', GetExerciceLog)

export { userRoutes };