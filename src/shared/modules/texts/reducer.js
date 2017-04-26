// @flow

import { handleActions } from 'redux-actions'

import * as t from './actions'

const initialState = {
  list: [],
}

const reducer = handleActions({
  [t.fetchList]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
}, initialState)

export default reducer
