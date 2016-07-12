const router = require('express').Router();
const controller = require('./textsController');

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne);

module.exports = router;
