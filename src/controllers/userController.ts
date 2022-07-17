import { Request, Response } from 'express';
import { ExerciceModel } from '../models/Exercice';
import { UserModel } from '../models/User';

export async function CreateUserController(req: Request, res: Response) {
  const { username } = req.body

  if (!username) return res.json({ error: "username is required!" })

  const userAlreadyExists = await UserModel.findOne({ username })

  if (userAlreadyExists) return res.json({ message: "username is already being used!" })

  const user = await UserModel.create({ username })

  return res.json(user)

}

export async function CreateExerciceController(req: Request, res: Response) {
  const userId = req.params.id

  const userExists = await UserModel.findById(userId)

  if (!userExists) return res.json({ message: "user doesn't exist!" })

  let { description, duration, date } = req.body

  if (!description || !duration) return res.json({ message: "some fields are missing" })

  date = new Date(date || new Date())

  const {_id} = await ExerciceModel.create({
    date,
    description,
    duration,
    user: userId
  })

  return res.json({
    username: userExists.username,
    description,
    duration,
    date: date.toDateString(),
    _id
  })

}