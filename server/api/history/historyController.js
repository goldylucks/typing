const History = require('./historyModel');

module.exports = {
  get: get,
  getByText: getByText,
  post: post
};

function get (req, res, next) {
  const userId = req.user && req.user._id;
  History.find({ userId })
    .populate('text')
    .then(history => res.json(history))
    .catch(next);
}

function getByText (req, res, next) {
  const userId = req.user && req.user._id;
  const textId = req.params.id;
  History.find({
    $and: [
      { userId },
      { text: textId }
    ]
  })
    .populate('text')
    .then(history => res.json(history))
    .catch(next);
}

function post (req, res, next) {
  const newEntry = req.body;
  newEntry.userId = req.user && req.user._id;
  History.create(newEntry)
    .then(text => res.status(201).json(text))
    .catch(next);
}
