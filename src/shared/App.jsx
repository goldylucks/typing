// @flow

import React from 'react'
import 'prop-types'
import Helmet from 'react-helmet'

import { APP_NAME } from './config'
import Routes from './Routes'

const App = () =>
  <div>
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <Routes />
  </div>

export default App
