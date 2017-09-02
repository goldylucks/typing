// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import texts from './modules/texts'
import NotFoundPage from './NotFoundPage'
import MainPage from './pages/MainPage'
import AddTextPage from './modules/addTexts/AddTextPage'
import History from './modules/history/HistoryPage'

/* eslint-disable */
const PrivateRoute = ({ component: Component, authenticated, ...props }) =>
  <Route
    {...props} render={() => (
    authenticated === true ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    )
    )}
  />
/* eslint-enable */

const Routes = (props: Object) =>
  <Switch>
    {texts.router}
    <Route path="/" component={MainPage} exact />
    <Route path="/add-text" component={AddTextPage} exact />
    <PrivateRoute authenticated={props.authenticated} path="/history" component={History} />
    <Route component={() => <NotFoundPage />} />
  </Switch>

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
})

export default connect(mapStateToProps)(Routes)
