import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <button onClick={e => props.click && props.click(props.label)} className={props.className}>{props.label}</button>
  )
}

export default Button