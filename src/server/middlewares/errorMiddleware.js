import serverLogger from '../serverUtils/serverLogger'

// eslint-disable-next-line no-unused-vars
const errMiddleware = (err, req, res, next) => {
  serverLogger.error(err.stack)
  if (err.code === 11000) {
    res.status(400).json({ message: 'user with that email already exists' })
    return
  }
  res.status(err.code).send(err.message)
}

export default errMiddleware
