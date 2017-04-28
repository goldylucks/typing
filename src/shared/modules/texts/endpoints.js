// @flow

export const FETCH_LIST = '/api/texts'
export const fetchItem = (id: string) => `/api/texts/${id || ':id'}`
