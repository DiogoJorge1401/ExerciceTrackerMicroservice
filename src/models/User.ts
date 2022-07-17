import m, { Schema } from 'mongoose';

const schema = new Schema({
  username: { type: String, required: true, unique: true }
})

export const UserModel = m.model('User', schema)