// @flow

import texts from '../shared/modules/texts'

import { textsListPage, mainPage, addTextPage, historyPage, finishPage } from './pageController'
import renderApp from './render-app'

const routing = (app: Object) => {
  app.get('/', (req, res) => {
    res.send(renderApp(req.url, mainPage()))
  })

  app.get(texts.routes.list, (req, res) => {
    res.send(renderApp(req.url, textsListPage()))
  })

  app.get('/add-text', (req, res) => {
    res.send(renderApp(req.url, addTextPage()))
  })

  app.get('/history', (req, res) => {
    res.send(renderApp(req.url, historyPage()))
  })

  app.get('/finish', (req, res) => {
    res.send(renderApp(req.url, finishPage()))
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url))
  })
}

export default routing
