import mongoose from 'mongoose';

export function connectToDB() {
  const URI = process.env.MONGO_URI as string
  mongoose.connect(URI)
}