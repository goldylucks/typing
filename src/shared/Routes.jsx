// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import texts from './modules/texts'
import NotFoundPage from './NotFoundPage'
import MainPage from './pages/MainPage'
import AddTextPage from './modules/add_texts/AddTextPage'
import login from './modules/auth_modal/LoginForm'

const Routes = () =>
  <Switch>
    {texts.router}
    <Route path="/" component={MainPage} exact />
    <Route path="/add-text" component={AddTextPage} exact />
    <Route path="/login" component={login} exact />
    <Route component={() => <NotFoundPage />} />
  </Switch>

export default Routes
