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

export async function GetAllUsersController(req: Request, res: Response) {
  const users = await UserModel.find()

  return res.json(users)
}

export async function CreateExerciceController(req: Request, res: Response) {
  try {

    const userId = req.params.id

    const userExists = await UserModel.findById(userId)

    if (!userExists) return res.json({ message: "user doesn't exist!" })

    let { description, duration, date } = req.body

    if (!description || !duration) return res.json({ message: "some fields are missing" })

    date = new Date(getDefaultDate(date))

    const { _id } = await ExerciceModel.create({
      date,
      description,
      duration,
      user: userId
    })

    return res.json({
      username: userExists.username,
      description,
      duration: +duration,
      date: date.toDateString(),
      _id
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }

}

export async function GetExerciceLog(req: Request, res: Response) {
  const userId = req.params.id
  const { from, to, limit = 100 } = req.query

  try {

    const userExists = await UserModel.findById(userId)

    if (!userExists) return res.json({ message: "user doesn't exist!" })

    let exercices = await ExerciceModel.find({
      user: userId,
      date: {
        $gte: new Date(getDefaultDate(from)),
        $lte: new Date(getDefaultDate(to))
      }
    }).limit(limit) as any

    exercices = exercices.map(({ description, duration, date }) => ({
      description,
      duration,
      date: new Date(date).toDateString()
    }))

    return res.json({
      _id: userId,
      username: userExists.username,
      count: exercices.length,
      log: exercices
    })

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }

}

function getDefaultDate(date: any) {
  return date || new Date()
}