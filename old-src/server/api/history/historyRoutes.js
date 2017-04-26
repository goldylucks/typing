const router = require('express').Router()
const controller = require('./historyController')
const usersService = require('../users/usersService')

router.route('/')
  .get(usersService.decodeToken, controller.get)
  .post(usersService.decodeToken, controller.post)

router.route('/getByText/:id')
  .get(usersService.decodeToken, controller.getByText)

module.exports = router
