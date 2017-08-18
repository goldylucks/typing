// @flow
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["submit"] }] */

import React, { Component } from 'react'

import { Header } from '../../components'

import AddTextForm from './AddTextForm'

class AddTextPage extends Component {
  submit(values: Object) {
    // eslint-disable-next-line no-console
    console.log(values)
  }

  render() {
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
            <AddTextForm onSubmit={this.submit} />
          </div>
        </div>
      </div>
    )
  }
}

export default AddTextPage
