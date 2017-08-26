// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import texts from './modules/texts'
import NotFoundPage from './NotFoundPage'
import MainPage from './pages/MainPage'
import AddTextPage from './modules/addTexts/AddTextPage'
import History from './modules/history/HistoryPage'
import parent from './components/MyParent'

const Routes = () =>
  <Switch>
    {texts.router}
    <Route path="/" component={MainPage} exact />
    <Route path="/add-text" component={AddTextPage} exact />
    <Route path="/history" component={History} exact />
    <Route path="/parent" component={parent} exact />
    <Route component={() => <NotFoundPage />} />
  </Switch>

export default Routes
