const logger = require('../utils/logger')

module.exports = function errorMiddleware(err, req, res, next) {
  logger.error(err.stack)
  res.status(err.code).send(`err: ${err.message}`)
}
