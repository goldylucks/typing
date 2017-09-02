// @flow

import { SIGN_IN_USER, SIGN_OUT_USER, OPEN_MODAL, CLOSE_MODAL } from './actions'

const initialState = {
  authenticated: false,
  modalIsOpen: false,
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

    case OPEN_MODAL:
      return {
        ...state, modalIsOpen: true,
      }

    case CLOSE_MODAL:
      return {
        ...state, modalIsOpen: false,
      }

    default:
      return state
  }
}

export default authReducer
