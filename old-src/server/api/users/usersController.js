const bcrypt = require('bcryptjs')
const CustomError = require('custom-error-generator')

const service = require('./usersService')
const User = require('./usersModel')

module.exports = {
  get,
  getOne,
  login,
  post, // signup
  put,
}

function get(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}

function getOne(req, res, next) {
  const id = req.params.id
  User.findById(id)
    .then(user => user ? res.json(user) : res.status(404).send("user doesn't exist"))
    .catch(next)
}

function login(req, res, next) {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new CustomError('custom error', {
          code: 404,
        })('user with that email does not exist or password is incorrect')
      }
      return user
    })
    .then((user) => {
      user = user.toObject()
      delete user.password
      user.token = service.signToken(user._id)
      res.json(user)
    })
    .catch(next)
}

function post(req, res, next) {
  const newUser = req.body

  User.create(newUser)
    .then((user) => {
      user = user.toObject()
      delete user.password
      user.token = service.signToken(user._id)
      res.status(201).json(user)
    })
    .catch(next)
}

function put(req, res, next) {
  User.update({ _id: req.params.id }, { $set: req.body })
    .then(DBres => res.json(DBres))
    .catch(next)
}
