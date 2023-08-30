import React, { useState } from 'react'
import { styled } from 'styled-components'

const GeneralButtonElementStyled = styled.button`

`

const Protection = styled.span`
  pointer-events: none;
`

const GeneralButtonElement = (props) => {
    const {id, song, label,handleClick,type} = props
  return (
    <GeneralButtonElementStyled id={id}  className={`btn ${type}`} onClick={(song)=>handleClick(song)}>
        <Protection>{label}</Protection>
    </GeneralButtonElementStyled>
  )
}

export default GeneralButtonElement