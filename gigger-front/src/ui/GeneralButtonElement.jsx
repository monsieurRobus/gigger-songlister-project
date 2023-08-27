import React, { useState } from 'react'
import { styled } from 'styled-components'

const GeneralButtonElementStyled = styled.button`
`

const GeneralButtonElement = (props) => {
    const {id, label,handleClick,type} = props
  return (
    <GeneralButtonElementStyled id={id} className={`btn ${type}`} onClick={handleClick}>
        {label}
    </GeneralButtonElementStyled>
  )
}

export default GeneralButtonElement