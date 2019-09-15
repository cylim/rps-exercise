import React from 'react'
import './App.css'

export const Indicator = ({text, background = 'red'}) => {
  return (
    <div style={{backgroundColor: background, padding: 2}}>
      <h4 style={{color: 'white'}}>{text}</h4>
    </div>
  )
}

export default Indicator
