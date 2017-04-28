// @flow

import React from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'

const styles = {
  letter: {
    position: 'relative',
    fontSize: 35,
    color: '#999',
    borderRadius: 4,
    outline: '1px solid white',
  },
  isCorrect: {
    color: '#008000',
    backgroundColor: '#e7fbd3',
  },
  isCorrectWasWrong: {
    color: 'green',
    backgroundColor: '#FFE9B2',
  },
  isWrong: {
    color: 'darkred',
    background: 'pink',
  },
}

type Props = {
  letter: string,
  wasWrong: ?boolean,
  isCorrect: ?boolean,
  isWrong: ?boolean,
  classes: Object,
}

const Letter = ({ letter, wasWrong, isCorrect, isWrong, classes }: Props) =>
  <span
    className={cx(
      classes.letter,
      isCorrect && classes.isCorrect,
      isWrong && classes.isWrong,
      isCorrect && wasWrong && classes.isCorrectWasWrong,
    )}
  >{letter}</span>
export default injectSheet(styles)(Letter)
