// @flow

import { SIGN_IN_USER, SIGN_OUT_USER } from './actions'

const initialState = {
  authenticated: false,
}

const authReducer = (state: {} = initialState, action: { type: string }) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state, authenticated: true,
      }

    case SIGN_OUT_USER:
      return {
        ...state, authenticated: false,
      }

    default:
      return state
  }
}

export default authReducer
