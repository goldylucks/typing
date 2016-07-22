const service = require('./usersService');
const User = require('./usersModel');

module.exports = {
  get,
  getOne,
  post,
  put
};

function get (req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

function getOne (req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .then(user => user ? res.json(user) : res.status(404).send("user doesn't exist"))
    .catch(next);
}

function post (req, res, next) {
  const newUser = req.body;

  User.create(newUser)
    .then(user => {
      user = user.toObject();
      delete user.password;
      user.token = service.signToken(user._id);
      res.status(201).json(user);
    })
    .catch(next);
}

function put (req, res, next) {
  User.update({ _id: req.params.id }, { $set: req.body })
    .then(DBres => res.json(DBres))
    .catch(next);
}
