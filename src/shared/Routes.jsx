// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import texts from './modules/texts'
import NotFoundPage from './NotFoundPage'

const Routes = () =>
  <Switch>
    {texts.routes.jsx}
    <Route component={() => <NotFoundPage />} />
  </Switch>

export default Routes
