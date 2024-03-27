import * as mongoose from 'mongoose';

export const User = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
