// @flow

import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import * as Actions from './actions'
import submit from './submit'

type Props = {
  handleSubmit: Function,
  error: any,
  submitting: boolean,
  pristine: boolean,
}

type Fields = {
  label: string,
  type: string,
  input: Object,
}

const renderField = ({ input, label, type }: Fields) =>
  <div className="form-group">
    <label htmlFor={input.name}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
    </div>
  </div>

const LoginForm = ({ error, handleSubmit, submitting, pristine }: Props) =>
  <form onSubmit={handleSubmit(submit)}>
    <Field name="email" type="text" component={renderField} label="Type your email here" />
    <Field name="password" type="password" component={renderField} label="Type your super secret password here" />
    {error && <span>{error}</span>}
    <div className="modal-footer">
      <button type="submit" disabled={pristine || submitting} className="btn btn-default" id="login">Login</button>
      <button type="button" className="btn btn-primary" id="signup">Signup</button>
    </div>
  </form>


export default connect(null, Actions)(reduxForm({
  form: 'login',
})(LoginForm))
