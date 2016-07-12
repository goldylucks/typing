const router = require('express').Router();

// router.use('/user', require('./user/userRoutes'));
router.use('/texts', require('./texts/textsRoutes'));

module.exports = router;
