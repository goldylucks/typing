const router = require('express').Router();

router.use('/texts', require('./texts/textsRoutes'));
router.use('/users', require('./users/usersRoutes'));

module.exports = router;
