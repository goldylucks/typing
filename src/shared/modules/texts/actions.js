// @flow

import { createAction } from 'redux-actions'

import { http } from '../../utils'

import { FETCH_LIST as FETCH_LIST_ENDPOINT } from './endpoints'

// fetchList
export const FETCH_LIST = 'texts/FETCH_LIST'
export const FETCH_LIST_SUCCESS = 'texts/FETCH_LIST_SUCCESS'
export const FETCH_LIST_FAILURE = 'texts/FETCH_LIST_FAILURE'
export const fetchListRequest = createAction(FETCH_LIST)
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS)
export const fetchListFailure = createAction(FETCH_LIST_FAILURE)
export const fetchList = () => (dispatch: Function) => {
  dispatch(fetchListRequest)
  http(FETCH_LIST_ENDPOINT)
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
  .then(res => dispatch(fetchListSuccess(res)))
  .catch(err => dispatch(fetchListFailure(err.message)))
}

// fetchTextItem
// createText
// deleteText
