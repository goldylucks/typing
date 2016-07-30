const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config/config');
const checkToken = expressJwt({ secret: config.secrets.jwt });
const User = require('../users/usersModel');

module.exports = {
  signToken: signToken,
  decodeToken: decodeToken,
  isOwner: isOwner,
  isSystem: isSystem,
  getFreshUser: getFreshUser
};

function signToken (_id) {
  return jwt.sign({ _id }, config.secrets.jwt);
}

function decodeToken (req, res, next) {
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token;
  }

  const authorization = req.headers.authorization || req.headers.Authorization;
  if (!authorization || !authorization.match('Bearer ')) {
    next();
    return;
  }
  checkToken(req, res, next);
}

function isOwner (req, res, next) {
  if (req.user._id !== req.params.id) {
    return res.status(401).send('Only the owner can do this operation!');
  }

  next();
}

function isSystem (req, res, next) {
  if (req.headers.sys_password !== config.sys_password) {
    return res.status(401).send('turn away slowly. No questions asked.');
  }

  next();
}

function getFreshUser (req, res, next) {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(401).send('token didn\'t match any user');
      }
      req.user = user;
      next();
    })
    .catch(next);
}
