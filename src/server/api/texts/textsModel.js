import mongoose, { Schema } from 'mongoose'

const textsSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true,
  },

  body: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },

})

export default mongoose.model('texts', textsSchema)
