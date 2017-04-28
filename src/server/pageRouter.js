// @flow

import texts from '../shared/modules/texts'

import { textsListPage } from './pageController'
import renderApp from './render-app'

const routing = (app: Object) => {
  app.get(texts.routes.list, (req, res) => {
    res.send(renderApp(req.url, textsListPage()))
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })
}

export default routing
