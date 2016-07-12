var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TextsSchema = getSchema();

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

    userId: Schema.Types.ObjectId

  });
}
