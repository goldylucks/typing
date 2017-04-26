const router = require('express').Router()

router.use('/texts', require('./texts/textsRoutes'))
router.use('/users', require('./users/usersRoutes'))
router.use('/history', require('./history/historyRoutes'))

module.exports = router
