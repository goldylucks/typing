// @flow

import React from 'react'
import 'prop-types'
import Helmet from 'react-helmet'

import { APP_NAME } from './config'
import Routes from './Routes'

const App = () =>
  <div className="main-container site">
    <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    <div className="site-content container">
      <Routes />
    </div>
  </div>

export default App
