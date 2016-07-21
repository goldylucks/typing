const mongoose = require('mongoose');

module.exports = after('clean db', done => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});
