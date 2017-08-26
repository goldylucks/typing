import React from 'react'
/* eslint-disable */

const MyChild = (props) => {
  return (
    <span ref={props.inputRef} style={{ fontFamily: 'monospace' }} id={`letter-${props.id}`}>{props.letter}</span>
  )
}

export default MyChild
