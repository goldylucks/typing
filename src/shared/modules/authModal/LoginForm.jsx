// @flow

import React from 'react'
import { Field, reduxForm } from 'redux-form'

import submit from './submit'

type Props = {
  handleSubmit: Function,
}

type Fields = {
  label: string,
  name: string,
  type: string,
  input: Object,
}

const renderField = ({ input, label, name, type }: Fields) =>
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
    </div>
  </div>

const LoginForm = ({ handleSubmit }: Props) =>
  <form onSubmit={handleSubmit(submit)}>
    <Field name="email" type="text" component={renderField} label="Type your email here" />
    <Field name="password" type="password" component={renderField} label="Type your super secret password here" />
    <div className="modal-footer">
      <button type="button" className="btn btn-default" id="login">Login</button>
      <button type="button" className="btn btn-primary" id="signup">Signup</button>
    </div>
  </form>

export default reduxForm({
  form: 'login',
})(LoginForm)
