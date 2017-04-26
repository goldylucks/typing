// @flow

import React from 'react'
import { connect } from 'react-redux'

import { Header } from '../../components'

import type { Text as textType } from './model'
import { fetchList } from './actions'

class ListPage extends React.Component {
  componentWillMount() {
    this.props.fetchTexts()
  }

  props: {
    texts: [textType],
    fetchTexts: Function,
  }

  render() {
    return (
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
              {this.props.texts.map(
                t => <a className="list-group-item" key={t.title}>{t.title}</a>,
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  texts: state.texts.list,
})

const mapDispatchToProps = dispatch => ({
  fetchTexts: () => dispatch(fetchList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListPage)
