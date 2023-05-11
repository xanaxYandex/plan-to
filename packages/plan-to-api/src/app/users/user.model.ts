import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: false},
  subscriptions: {type: [Object], required: false},
})

