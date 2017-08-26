import React from 'react'

import MyChild from './MyChild'

const myText = 'The following Self Confidence script can help you boost your self-esteem. This is a trait that any successful'

export default class MyParent extends React.Component {
  state = {
    top: null,
    left: null,
  }

  getDimension = (el) => {
    const { top, left } = el.getBoundingClientRect()
    return { top, left }
  }

  focus = () =>
    this.setState(this.getDimension(this.inputElement))

  render() {
    return (
      <div>
        <p>My child: </p>
        <div style={{ width: '300px', height: '100px', background: 'gray', overflow: 'hidden' }}>
          {myText.split('').map(
            (l, id) =>
              // eslint-disable-next-line
              <MyChild key={id} inputRef={el => this.inputElement = el} letter={l} id={id} />
            )
          }
        </div>
        <button
          type="button"
          onClick={this.focus}
        >Get Letter position</button>
        <p>top: {this.state.top}</p>
        <p>left: {this.state.left}</p>
        <p>myText[lastkey] = {myText[myText.length - 1]}</p>
      </div>
    )
  }
}
