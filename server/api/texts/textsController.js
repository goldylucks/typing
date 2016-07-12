var Texts = require('./textsModel');

module.exports = {
  get: get,
  getOne: getOne
};

function get (req, res, next) {
  Texts.find({}, 'title')
    .then(texts => res.json(texts))
    .catch(next);
}

function getOne (req, res, next) {
  var id = req.params.id;
  console.log(req.params);
  Texts.findById(id)
    .then(text => text ? res.json(text) : res.status(404).send('text doesn\'t exist'))
    .catch(next);
}
