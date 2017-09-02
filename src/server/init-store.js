// @flow

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'

import texts from '../shared/modules/texts'
import authReducer from '../shared/modules/authModal/reducer'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.texts) {
    // flow-disable-next-line
    preloadedState.texts = Object.assign(
      {},
      texts.reducer(undefined, {}),
      plainPartialState.texts,
    )
  }

  const reducers = combineReducers({
    texts: texts.reducer,
    auth: authReducer,
  })
  return createStore(reducers, preloadedState, applyMiddleware(thunkMiddleware))
}

export default initStore
