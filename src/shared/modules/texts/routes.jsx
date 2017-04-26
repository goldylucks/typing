// @flow

import React from 'react'
import { Route } from 'react-router-dom'

import ListPage from './ListPage'

export const path = {
  list: '/texts',
}

export default {
  jsx: [
    <Route exact path={path.list} component={ListPage} key={path.list} />,
  ],
  path,
}
