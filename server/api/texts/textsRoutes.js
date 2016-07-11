var router = require('express').Router();
var controller = require('./textsController');

router.route('/')
  .get(controller.get);

module.exports = router;
