import { handleActions } from 'redux-actions'

import { texts } from '../../../server/serverUtils/seedData'

import * as t from './actions'

const initialState = {
  list: texts,
}

const reducer = handleActions({
  [t.fetchList]: (state, action) => ({
    ...state,
    list: action.payload,
  }),
}, initialState)

export default reducer
