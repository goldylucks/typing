const router = require('express').Router();

router.use('/texts', require('./texts/textsRoutes'));

module.exports = router;
