// @flow

import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  container: {
    width: 910,
    margin: '20px auto 0',
    paddingTop: 20,
    borderTop: '1px solid #999',
  },

  stats: {
    float: 'right',
    color: '#999',
    '&:after': {
      clear: 'both',
    },
  },

  wpm: {
    display: 'inline-block',
    marginRight: 10,
  },

  accuracy: {
    display: 'inline-block',
  },

  letter: {
    position: 'relative',
    fontSize: 35,
    color: '#999',
    borderRadius: 4,
    outline: '1px solid white',
  },
}

type Props = {
  wpm: number,
  accuracy: number,
  classes: Object,
}

const Stats = ({ wpm, accuracy, classes }: Props) =>
  <div className={classes.container}>
    <div className={classes.stats}>
      <div className={classes.wpm}>
        wpm:
        <span className={classes.letter}>{wpm}</span>
      </div>
      <div className={classes.accuracy}>
        accuracy:
        <span className={classes.letter}>
          <span>{accuracy}</span>%
        </span>
      </div>
    </div>
  </div>

export default injectSheet(styles)(Stats)
