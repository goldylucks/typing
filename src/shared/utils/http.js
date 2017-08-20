// @flow

import 'isomorphic-fetch'

const parseJSON = (response: Object) =>
  new Promise(
    resolve => (response.code === 204 && response.json()) || Promise.resolve(response)
    .then(json => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })),
  )

const request = (endpoint: string, options?: Object) =>
  new Promise((resolve, reject) => {
    fetch(endpoint, options)
      .then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json)
        }
        return reject(response.json.message)
      })
      .catch(err => reject(err.message))
  })

export default request
