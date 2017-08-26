// @flow

import React from 'react'
import { connect } from 'react-redux'
import injectSheet from 'react-jss'
import Helmet from 'react-helmet'

import { calcMinutesDifference } from '../../utils/time'

import type { Text as textType } from './model'
import { fetchItem } from './actions'
import Letter from './Letter'
import Cursor from './Cursor'
import Stats from './Stats'

const LETTER_TO_WORD_RATIO = 4
const ignoredKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Shift', 'Control', 'CapsLock', 'Alt', 'Tab']
const shouldIgnoreKey = (key, ctrlKey, altKey) => ctrlKey || altKey || ignoredKeys.includes(key)

const styles = {
  textHeightContainer: {
    overflow: 'hidden',
    marginTop: '5em',
    height: 230,
  },
  textContainer: {
    position: 'relative',
    fontFamily: 'monospace',
    width: 900,
    lineHeight: '4em',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
}

class ItemPage extends React.Component {

  state = {
    activeLetterIdx: 0,
    isActive: false,
    started: 0,
    cursor: {
      top: 8,
      left: 0,
    },
  }

  componentWillMount() {
    global.calcCorrect = this.calcCorrect
    global.calcMinutes = this.calcMinutes
    this.props.fetchText()
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown = (evt: Object) => {
    const { key, ctrlKey, altKey } = evt
    if (shouldIgnoreKey(key, ctrlKey, altKey)) {
      return
    }

    if (evt.keyCode === 32) {
      evt.preventDefault()
    }

    if (key === 'Backspace') {
      if (this.state.activeLetterIdx === 0) return
      this.adjustCursorPosition(this.state.activeLetterIdx - 1)
      this.setState(state => ({
        activeLetterIdx: state.activeLetterIdx - 1,
        [`letter-${state.activeLetterIdx - 1}-isCorrect`]: false,
        [`letter-${state.activeLetterIdx - 1}-isWrong`]: false,
      }))
      return
    }

    // flow-disable-next-line
    const isCorrect = key === this.props.text.body.split('')[this.state.activeLetterIdx]

    this.adjustCursorPosition(this.state.activeLetterIdx + 1)
    this.setState(state => ({
      activeLetterIdx: state.activeLetterIdx + 1,
      [`letter-${state.activeLetterIdx}-isCorrect`]: isCorrect,
      [`letter-${state.activeLetterIdx}-isWrong`]: !isCorrect,
      [`letter-${state.activeLetterIdx}-wasWrong`]: state[`letter-${state.activeLetterIdx}-wasWrong`] || !isCorrect,
      isActive: true,
      started: state.started || Date.now(),
    }))
  }

  letterElement = []

  calcCorrect() {
    return Object.keys(this.state)
      .filter(key => key.match(/isCorrect$/) && this.state[key]).length
  }

  calcMinutes() {
    return calcMinutesDifference(this.state.started, Date.now())
  }

  calcWpm() {
    if (this.state.activeLetterIdx < 8) return 0
    return Math.floor((this.calcCorrect() / this.calcMinutes()) / LETTER_TO_WORD_RATIO)
  }

  calcAccuracy() {
    if (!this.state.activeLetterIdx) return 0
    return Math.floor((this.calcCorrect() / this.state.activeLetterIdx) * 100)
  }

  adjustCursorPosition(nextLetterIdx) {
    const top = this.letterElement[nextLetterIdx].offsetTop
    const left = this.letterElement[nextLetterIdx].offsetLeft
    this.setState({ cursor: { top, left } })
  }

  props: {
    text: ?textType,
    classes: Object,
    fetchText: Function,
  }

  render() {
    const { classes, text } = this.props
    if (!text || text.isLoading) return <h1>Loading Text...</h1>
    if (text.error) return <h1>Error Loading Text :(</h1>
    return (
      <div>
        <Helmet
          title={text.title}
          meta={[
            { property: 'og:title', content: text.title },
          ]}
        />
        <div className={classes.textHeightContainer}>
          <div className={classes.textContainer}>
            <div>
              {text.body.split('').map(
                (l, idx) =>
                  <Letter
                    // eslint-disable-next-line
                    key={idx}
                    letter={l}
                    isCorrect={this.state[`letter-${idx}-isCorrect`]}
                    isWrong={this.state[`letter-${idx}-isWrong`]}
                    wasWrong={this.state[`letter-${idx}-wasWrong`]}
                    letterRef={(el) => { this.letterElement[idx] = el }}
                  />,
              )}
            </div>
            <Cursor
              shouldBeActive={this.state.isActive}
              activeLetterIdx={this.state.activeLetterIdx}
              top={this.state.cursor.top}
              left={this.state.cursor.left}
            />
          </div>
        </div>
        <Stats
          wpm={this.calcWpm()}
          accuracy={this.calcAccuracy()}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  text: state.texts.byId[props.match.params.id],
})

const mapDispatchToProps = (dispatch, props) => ({
  fetchText: () => dispatch(fetchItem(props.match.params.id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(ItemPage))
