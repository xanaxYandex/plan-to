import * as mongoose from 'mongoose';

export const FilmingRecordSchema = new mongoose.Schema({
  additionalInfo: {type: String, required: false},
  customer: {type: String, required: false},
  date: {type: Date, required: true},
  deadline: {type: Date, required: true},
  duration: {type: Number, required: true},
  location: {type: {address: String, mapUrl: String}, required: true},
  props: {type: [String], required: true},
  reference: {type: String, required: true},
  title: {type: String, required: true},
  type: {type: [String], required: true},
  creator: { type: mongoose.Types.ObjectId, ref: 'User', select: false}
})

