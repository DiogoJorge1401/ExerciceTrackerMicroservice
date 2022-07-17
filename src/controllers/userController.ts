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

    await ExerciceModel.create({
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
      _id: userId
    })
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }

}

export async function GetExerciceLog(req: Request, res: Response) {
  const userId = req.params.id
  let { from = '1970', to, limit } = req.query as {
    from?: string, to?: string, limit?: number
  }
  const fromDate = new Date(from).getTime()
  let toDate: number

  try {

    const userExists = await UserModel.findById(userId)

    if (!userExists) return res.json({ message: "user doesn't exist!" })

    const exercices = await ExerciceModel.find({
      user: userId
    })

    limit ??= exercices.length

    const formattedExercices = exercices
      .filter((exe) => {
        const date = new Date(exe.date).getTime()

        if (to) {
          toDate = new Date(to).getTime()
          return (date >= fromDate && date <= toDate)
        }

        return (date >= fromDate)
      })
      .slice(0, limit)
      .map(({ description, duration, date }) => ({
        description,
        duration,
        date: new Date(date).toDateString()
      }))

    return res.json({
      username: userExists.username,
      count: formattedExercices.length,
      _id: userId,
      log: formattedExercices
    })

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" })
  }

}

function getDefaultDate(date: any) {
  return date || new Date()
}