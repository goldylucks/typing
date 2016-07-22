const router = require('express').Router();
const controller = require('./textsController');
const usersService = require('../users/usersService');

router.route('/')
  .get(usersService.decodeToken, controller.get)
  .post(usersService.decodeToken, controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(usersService.decodeToken, controller.getOne);

module.exports = router;
