// @flow

import morgan from 'morgan'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'

import serverConfig from '../serverConfig'

const appMiddleware = (app: Object) => {
  if (serverConfig.isLogging) {
    app.use(morgan('dev'))
  }

  app.use(compression())
  app.use(cors()) // @TODO [AdGo] 20/03/2017 - restrict to our domain before launch
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
}

export default appMiddleware
