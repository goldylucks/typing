const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UsersSchema = getSchema();

UsersSchema.pre('save', preSave);

module.exports = mongoose.model('users', UsersSchema);

function getSchema () {
  return new Schema({

    name: String,

    email: {
      type: mongoose.SchemaTypes.Email,
      required: true
    },

    password: {
      type: String,
      select: false,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true
    }

  });
}

function preSave (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
      return;
    }
    this.password = hash;
    next();
  });
}
