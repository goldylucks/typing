// @flow

import React from 'react'
import { Field, reduxForm } from 'redux-form'

import submit from './submit'

type Props = {
  handleSubmit: Function,
}

const renderField = ({ input, label, name, type, meta: { touched, error } }) =>
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className="form-control" />
    </div>
  </div>

const LoginForm = ({ handleSubmit }: Props) =>
  <div id="loginModal" className="modal fade">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">×</button>
          <h5 className="modal-title">Signup</h5>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit(submit)}>
            <Field name="email" type="text" component={renderField} label="Type your email here" />
            <Field name="password" type="password" component={renderField} label="Type your super secret password here" />
            <div className="modal-footer">
              <button type="button" className="btn btn-default" id="login">Login</button>
              <button type="button" className="btn btn-primary" id="signup">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

export default reduxForm({
  form: 'login',
})(LoginForm)
