import { Router } from 'express';
import { CreateExerciceController, CreateUserController } from '../controllers/userController';

const userRoutes = Router();

userRoutes.post('/', CreateUserController)
userRoutes.post('/:id/exercices', CreateExerciceController)

export { userRoutes };