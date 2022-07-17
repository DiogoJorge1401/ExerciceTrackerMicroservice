import m, { Schema } from 'mongoose';

const schema = new Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export const ExerciceModel = m.model('Exercice', schema)