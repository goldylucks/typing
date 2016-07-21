const Texts = require('./textsModel');

module.exports = {
  get,
  getOne,
  post,
  put
};

function get (req, res, next) {
  Texts.find({}, 'title')
    .then(texts => res.json(texts))
    .catch(next);
}

function getOne (req, res, next) {
  const { id } = req.params;
  Texts.findById(id)
    .then(text => text ? res.json(text) : res.status(404).send('text doesn\'t exist'))
    .catch(next);
}

function post (req, res, next) {
  const newText = req.body;

  Texts.create(newText)
    .then(text => res.status(201).json(text))
    .catch(next);
}

function put (req, res, next) {
  Texts.update({ _id: req.params.id }, { $set: req.body })
    .then(DBres => res.json(DBres))
    .catch(next);
}
