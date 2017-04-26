// @flow

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { SheetsRegistry, SheetsRegistryProvider } from 'react-jss'

import { APP_CONTAINER_CLASS, JSS_SSR_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/utils'
import App from '../shared/App'

import initStore from './init-store'

const renderApp = (location: string, plainPartialState: ?Object, routerContext: ?Object = {}) => {
  const store = initStore(plainPartialState)
  const sheets = new SheetsRegistry()
  const appHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={location} context={routerContext}>
        <SheetsRegistryProvider registry={sheets}>
          <App />
        </SheetsRegistryProvider>
      </StaticRouter>
    </Provider>)
  const head = Helmet.rewind()

  return (
    `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        <link href="${STATIC_PATH}/css/vendor/bootstrap.min.css" rel="stylesheet" />
        <style class="${JSS_SSR_CLASS}">${sheets.toString()}</style>
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
        </script>
        <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
      </body>
    </html>`
  )
}

export default renderApp
