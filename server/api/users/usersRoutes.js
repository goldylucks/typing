const router = require('express').Router();
const controller = require('./usersController');
const service = require('./usersService');

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(service.decodeToken, service.addUserIdToBody, service.isOwner, controller.put);

module.exports = router;
