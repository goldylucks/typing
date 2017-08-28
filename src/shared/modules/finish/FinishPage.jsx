// @flow

import React from 'react'
import injectSheet from 'react-jss'

import { Header } from '../../components'

const title = 'Sample title'
const id = 123

const FinishPage = ({ classes }: { classes: Object}) => (
  <div>
    <Header />
    <div className="container">
      <h1 className={classes.title}>Result for text {title}</h1>
      <div className={`row ${classes.stats}`}>
        <div className="col col-md-4">
          Speed
          <span className="pull-right">46 WPM</span>
        </div>
      </div>
      <div className={`row ${classes.stats}`}>
        <div className="col col-md-4">
          Accuracy
          <span className="pull-right">100%</span>
        </div>
      </div>
      <div className={`row ${classes.stats}`}>
        <div className="col col-md-4">
          Time
          <span className="pull-right">10 s</span>
        </div>
      </div>
      <div className={`row ${classes.actions}`}>
        <a href="texts">menu</a>
        <a href={`texts/${id}`}>redo</a>
      </div>
      <div id="history-container" />
    </div>
  </div>
)

const styles = {
  title: {
    marginTop: '1em',
    marginBottom: '2em',
  },

  stats: {
    fontSize: '2em',
  },

  actions: {
    fontSize: '2em',
    marginTop: '1em',
    marginBottom: '1em',
  },
}

export default injectSheet(styles)(FinishPage)
