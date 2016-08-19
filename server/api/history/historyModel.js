const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = getSchema();

module.exports = mongoose.model('history', HistorySchema);

function getSchema () {
  return new Schema({

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },

    text: {
      type: Schema.Types.ObjectId,
      ref: 'texts',
      required: true
    },

    wpm: {
      type: Number,
      required: true,
      min: 0
    },

    // percentage
    accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },

    // seconds
    time: {
      type: Number,
      required: true,
      min: 0
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }

  });
}
