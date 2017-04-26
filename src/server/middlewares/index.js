import notFound from './404ApiMiddleware'
import app from './appMiddlewares'
import error from './errorMiddleware'

export default {
  notFound,
  app,
  error,
}
