// @flow

import { SubmissionError } from 'redux-form'
import type { Dispatch } from 'redux'

import * as Actions from './actions'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const submit = (values: Object, dispatch: Dispatch<*>) =>
  sleep(1000).then(() => {
    // simulate server latency
    if (!['matthew', 'mark', 'luke', 'john'].includes(values.email)) {
      throw new SubmissionError({
        username: 'User does not exist',
        _error: 'Login failed!',
      })
    } else if (values.password !== 'redux-form') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed',
      })
    } else {
      dispatch(Actions.signInUser(values))
    }
  })


export default submit
