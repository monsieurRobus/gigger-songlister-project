import React from 'react'
import './Tags.css'
const TagBubble = (props) => {
    const {name,id,color,description} = props

  return (
    <div className={'tagBubble'}>
        <h3>{name}</h3>
        <span class="close">X</span>

    </div>
  )
}

export default TagBubble