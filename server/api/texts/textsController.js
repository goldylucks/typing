const Texts = require('./textsModel');

module.exports = {
  get,
  getOne,
  post,
  put
};

function get (req, res, next) {
  const userId = req.user && req.user._id;
  Texts.find({
    $or: [
      { userId },
      { public: true }
    ]
  }, 'title')
    .then(texts => res.json(texts))
    .catch(next);
}

function getOne (req, res, next) {
  SHOUT(req.headers, req.headers.authorization);
  const userId = req.user && req.user._id;
  const { id } = req.params;
  Texts.findById(id)
    .then(text => {
      if (!text) {
        res.status(404).send('text does not exist');
        return;
      }
      text = text.toObject();
      text.userId = String(text.userId);
      if (!text.public && text.userId !== userId) {
        res.status(401).send('you do not have access to this text');
        return;
      }
      res.json(text);
    })
    .catch(next);
}

function post (req, res, next) {
  const newText = req.body;
  newText.userId = req.user && req.user._id;

  Texts.create(newText)
    .then(text => res.status(201).json(text))
    .catch(next);
}

function put (req, res, next) {
  Texts.update({ _id: req.params.id }, { $set: req.body })
    .then(DBres => res.json(DBres))
    .catch(next);
}
