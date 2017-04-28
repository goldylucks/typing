// @flow

import React from 'react'
import { Route } from 'react-router-dom'

import routes from './routes'
import ListPage from './ListPage'
import ItemPage from './ItemPage'

export default [
  <Route exact path={routes.list} component={ListPage} key={routes.list} />,
  <Route exact path={routes.item()} component={ItemPage} key={routes.item} />,
]
