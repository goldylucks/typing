// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import texts from './modules/texts'
import NotFoundPage from './NotFoundPage'
import MainPage from './pages/MainPage'
import AddTextPage from './modules/addTexts/AddTextPage'
import History from './modules/history/HistoryPage'
import Finish from './modules/finish/FinishPage'

const Routes = () =>
  <Switch>
    {texts.router}
    <Route path="/" component={MainPage} exact />
    <Route path="/add-text" component={AddTextPage} exact />
    <Route path="/history" component={History} exact />
    <Route path="/finish" component={Finish} exact />
    <Route component={() => <NotFoundPage />} />
  </Switch>

export default Routes
