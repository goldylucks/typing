// @flow

import { createAction } from 'redux-actions'

import { http } from '../../utils'

import {
  FETCH_LIST as FETCH_LIST_ENDPOINT,
  fetchItem as fetchItemEndpoint,
} from './endpoints'

// fetchList
export const FETCH_LIST = 'texts/FETCH_LIST'
export const FETCH_LIST_SUCCESS = 'texts/FETCH_LIST_SUCCESS'
export const FETCH_LIST_FAILURE = 'texts/FETCH_LIST_FAILURE'
export const fetchListRequest = createAction(FETCH_LIST)
export const fetchListSuccess = createAction(FETCH_LIST_SUCCESS)
export const fetchListFailure = createAction(FETCH_LIST_FAILURE)
export const fetchList = () => (dispatch: Function) => {
  dispatch(fetchListRequest())
  return http(FETCH_LIST_ENDPOINT)
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
  .then(res => dispatch(fetchListSuccess(res)))
  .catch(err => dispatch(fetchListFailure(err.message)))
}

// fetchItem
export const FETCH_ITEM = 'texts/FETCH_ITEM'
export const FETCH_ITEM_SUCCESS = 'texts/FETCH_ITEM_SUCCESS'
export const FETCH_ITEM_FAILURE = 'texts/FETCH_ITEM_FAILURE'
export const fetchItemRequest = createAction(FETCH_ITEM)
export const fetchItemSuccess = createAction(FETCH_ITEM_SUCCESS)
export const fetchItemFailure = createAction(FETCH_ITEM_FAILURE)
export const fetchItem = (id: string) => (dispatch: Function) => {
  dispatch(fetchItemRequest(id))
  return http(fetchItemEndpoint(id))
  .then((res) => {
    if (!res.ok) throw new Error(res.statusText)
    return res.json()
  })
  .then(res => dispatch(fetchItemSuccess(res)))
  .catch(err => dispatch(fetchItemFailure({ _id: id, err: err.message })))
}

// fetchTextItem
// createText
// deleteText
