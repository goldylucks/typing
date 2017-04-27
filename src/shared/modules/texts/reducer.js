// @flow

import { handleActions } from 'redux-actions'

import * as t from './actions'
import type { State } from './model'

const initialState: State = {
  list: [],
  byId: {},
}

const reducer = handleActions({
  [t.FETCH_LIST_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload,
  }),

  [t.FETCH_ITEM]: (state, action) => ({
    ...state,
    byId: Object.assign(
      {},
      state.byId,
      {
        [action.payload]: {
          isLoading: true,
        },
      },
    ),
  }),

  [t.FETCH_ITEM_SUCCESS]: (state, action) => ({
    ...state,
    byId: Object.assign(
      {},
      state.byId,
      {
        [action.payload._id]: {
          isLoading: false,
          ...action.payload,
        },
      },
    ),
  }),

  [t.FETCH_ITEM_FAILURE]: (state, action) => ({
    ...state,
    byId: Object.assign(
      {},
      state.byId,
      {
        [action.payload._id]: {
          isLoading: false,
          error: action.payload.error,
        },
      },
    ),
  }),

}, initialState)

export default reducer
