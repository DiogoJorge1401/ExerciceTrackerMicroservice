  import { Router } from 'express';
import { CreateExerciceController, CreateUserController, GetAllUsersController } from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/', CreateUserController)
userRoutes.get('/', GetAllUsersController)
userRoutes.post('/:id/exercises', CreateExerciceController)

export { userRoutes };