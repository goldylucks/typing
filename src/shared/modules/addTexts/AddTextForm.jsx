// @flow

import React from 'react'
import { Field, reduxForm } from 'redux-form'

type Props = {
  handleSubmit: Function,
}

const AddTextForm = ({ handleSubmit }: Props) =>
  <form onSubmit={handleSubmit}>
    <div className="col col-md-12">
      <div className="form-group">
        <Field id="title" name="title" component="input" type="text" placeholder="Give your text a lovely title" required className="form-control" />
      </div>
    </div>
    <div className="col col-md-12">
      <div className="form-group">
        <Field id="body" name="body" component="textarea" rows="10" placeholder="Copy paste your text here (or type it directly)" required className="form-control" />
      </div>
    </div>
    <div className="checkbox col col-md-12">
      <label htmlFor="public">
        <Field name="public" id="public" component="input" type="checkbox" />
        Public
      </label>
    </div>
    <div className="col col-md-4">
      <button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
    </div>
  </form>

export default reduxForm({
  form: 'addtext',
})(AddTextForm)
