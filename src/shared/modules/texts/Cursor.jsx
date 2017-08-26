// @flow

import React from 'react'
import injectSheet from 'react-jss'
import cx from 'classnames'

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
    top: 8,
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

  componentWillUnmount() {
    if (this.blinkInterval) {
      clearInterval(this.blinkInterval)
    }
  }

  blinkInterval = null

  props: {
    classes: Object,
    shouldBeActive: boolean,
    top: number,
    left: number,
  }

  blink = () => this.setState(state => ({
    isDisplayed: !state.isDisplayed,
  }))

  render() {
    const { classes, top, left } = this.props
    return (
      <div
        className={cx(
          classes.cursor,
          { [classes.isDisplayed]: this.state.isDisplayed },
        )}
        style={{ left, top }}
      />
    )
  }
}

export default injectSheet(styles)(Cursor)
