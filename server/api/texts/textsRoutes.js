const router = require('express').Router();
const controller = require('./textsController');
const usersService = require('../users/usersService');

router.route('/')
  .get(controller.get)
  .post(usersService.decodeToken, usersService.addUserIdToBody, controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(usersService.decodeToken, usersService.addUserIdToBody, controller.getOne);

module.exports = router;
