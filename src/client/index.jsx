// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import CreateLogger from 'redux-logger'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { reducer as formReducer } from 'redux-form'

import texts from '../shared/modules/texts'
import { APP_SELECTOR, JSS_SSR_SELECTOR } from '../shared/config'
import { isProd } from '../shared/utils'
import App from '../shared/App'

const jssServerSide = document.querySelector(JSS_SSR_SELECTOR)
// flow-disable-next-line
jssServerSide.parentNode.removeChild(jssServerSide)

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-disable no-underscore-dangle */

const loggerMiddleware = new CreateLogger({
  predicate: () => !isProd,
  collapsed: true,
})

const reducers = {
  texts: texts.reducer,
  form: formReducer,
}

const store = createStore(
  combineReducers(reducers),
  preloadedState,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)))

const render = (AppComponent, reduxStore) =>
  ReactDOM.render( // eslint-disable-line react/no-render-return-value
    <Provider store={reduxStore}>
      <BrowserRouter>
        <AppContainer>
          <AppComponent />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    document.querySelector(APP_SELECTOR),
  )

render(App, store)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/App', () => {
    const NextApp = require('../shared/App').default // eslint-disable-line global-require
    render(NextApp, store)
  })
}
