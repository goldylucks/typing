const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextsSchema = getSchema();

TextsSchema.pre('save', preSave);

module.exports = mongoose.model('texts', TextsSchema);

function getSchema () {
  return new Schema({

    title: {
      type: String,
      required: true
    },

    body: {
      type: String,
      required: true
    },

    public: {
      type: Boolean,
      required: true,
      default: true
    },

    userId: Schema.Types.ObjectId,

    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }

  });
}

function preSave (next) {
  this.body = parseBody(this.body);
  next();
}

function parseBody (body) {
  return body.replace(/[”“]/g, '"').replace(/[’`]/g, '\'');
}
