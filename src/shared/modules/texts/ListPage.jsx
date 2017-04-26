// @flow

import React from 'react'
import { connect } from 'react-redux'

import { Header } from '../../components'

const TextsList = ({ texts }) =>
  <div className="list-group">
    {texts.map(
      t => <a className="list-group-item" key={t.title}>{t.title}</a>,
    )}
  </div>

const ListPage = ({ texts }) =>
  <div>
    <Header />
    <div className="container">
      <div className="row">
        <div className="col col-md-12">
          <h1>Choose a text to practice below</h1>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12">
          <TextsList texts={texts} />
        </div>
      </div>
    </div>
  </div>

const mapStateToProps = state => ({
  texts: state.texts.list,
})

export default connect(mapStateToProps)(ListPage)
