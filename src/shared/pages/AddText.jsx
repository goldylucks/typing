// @flow

import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { Header } from '../components'

const AddTextForm = () => {
  // const { handleSubmit } = props
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col col-md-12" style={{ margin: '3em 0' }}>
            <h1 style={{ fontSize: '4em' }}>Add your own text to practice typing</h1>
          </div>
        </div>
        <div className="row">
          <form>
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
            <div className="col col-md-12">
              <div className="checkbox">
                <label htmlFor="public">
                  <Field name="public" id="public" component="input" type="checkbox" />
                  Public
                </label>
              </div>
            </div>
            <div className="col col-md-4">
              <button id="submit" className="btn btn-lg btn-primary btn-block" type="button">submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'addtext',
})(AddTextForm)
