// @flow

import React from 'react'
import injectSheet from 'react-jss'

import { Header } from '../../components'

type Props = {
  id: string,
  title: string,
  wpm: number,
  accuracy: number,
  sec: Date,
  classes: Object,
}

const FinishPage = ({ classes, id, title, wpm, accuracy, sec }: Props) => (
  <div>
    <Header />
    <div className="container">
      <h1 className={classes.title}>Result for text <i>{title}</i></h1>
      <div className={`row ${classes.stats}`}>
        <div className="col col-md-4">
          Speed
          <span className="pull-right">{wpm} WPM</span>
        </div>
      </div>
      <div className={`row ${classes.stats}`}>
        <div className="col col-md-4">
          Accuracy
          <span className="pull-right">{accuracy}%</span>
        </div>
      </div>
      <div className={`row ${classes.stats}`}>
        <div className="col col-md-4">
          Time
          <span className="pull-right">{sec * 60} s</span>
        </div>
      </div>
      <div className={`row ${classes.actions}`}>
        <a href="/texts" className="col-md-1">menu</a>
        <a href={`/texts/${id}`} className="col-md-1">redo</a>
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
