var router = require('express').Router();
var controller = require('./textsController');

router.route('/')
  .get(controller.get);

router.route('/:id')
  .get(controller.getOne);

module.exports = router;
