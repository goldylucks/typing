const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');
const Schema = mongoose.Schema;

const UsersSchema = getSchema();

UsersSchema.pre('save', preSave);

module.exports = mongoose.model('users', UsersSchema);

function getSchema () {
  return new Schema({

    name: {
      type: String,
      required: true
    },

    password: {
      type: String,
      select: false,
      required: true
    }

  });
}

function preSave (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
}
