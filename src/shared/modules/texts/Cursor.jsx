// @flow

import React from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'

const INITIAL_OFFSET_TOP = 9
const LETTERS_IN_ROW = 40
const LINE_HEIGHT_DIFF = 63
const LETTERS_HEIGHT = 40
const LETTER_WIDTH = 21.0625

const styles = {
  cursor: {
    borderBottom: '#3879D9 2px solid',
    position: 'absolute',
    width: LETTER_WIDTH,
    height: LETTERS_HEIGHT,
    opacity: 0,
    background: 'white',
  },
  isDisplayed: {
    opacity: 0.5,
  },
}

class Cursor extends React.Component {

  state = {
    isDisplayed: true,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldBeActive && !this.props.shouldBeActive) {
      this.blinkInterval = setInterval(this.blink, 500)
    }
  }

  blinkInterval = null

  props: {
    classes: Object,
    shouldBeActive: boolean,
    activeLetterIdx: number,
  }

  blink = () => this.setState(state => ({
    isDisplayed: !state.isDisplayed,
  }))

  render() {
    const { classes, activeLetterIdx } = this.props
    return (
      <div
        className={cx(
          classes.cursor,
          { [classes.isDisplayed]: this.state.isDisplayed },
        )}
        style={{
          left: (activeLetterIdx % LETTERS_IN_ROW) * LETTER_WIDTH,
          top: INITIAL_OFFSET_TOP + (
            Math.floor((activeLetterIdx) / LETTERS_IN_ROW) * LINE_HEIGHT_DIFF
          ),
        }}
      />
    )
  }
}

export default injectSheet(styles)(Cursor)
