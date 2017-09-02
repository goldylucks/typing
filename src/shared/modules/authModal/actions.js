// @flow

export const SIGN_IN_USER = 'SIGN_IN_USER'
export const SIGN_OUT_USER = 'SIGN_OUT_USER'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'


export function signInUser() {
  return {
    type: SIGN_IN_USER,
  }
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  }
}

export function openModal() {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}
