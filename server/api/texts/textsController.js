var Texts = require('./textsModel');

module.exports = {
  get: get
};

function get (req, res, next) {
  Texts.find()
    .then(texts => res.json(texts))
    .catch(next);
}
