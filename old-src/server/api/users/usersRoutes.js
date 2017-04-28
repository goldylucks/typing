const router = require('express').Router()
const controller = require('./usersController')
const service = require('./usersService')

router.route('/')
  .post(controller.post)

router.route('/login')
  .post(controller.login)

router.route('/:id')
  // .get(controller.getOne)
  .put(service.decodeToken, service.isOwner, controller.put)

module.exports = router
