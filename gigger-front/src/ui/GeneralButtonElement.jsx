import React, { useState } from 'react'
import { styled } from 'styled-components'

const GeneralButtonElementStyled = styled.button`
`

const GeneralButtonElement = (props) => {
    const {label,handleClick} = props
  return (
    <GeneralButtonElementStyled onClick={handleClick}>
        {label}
    </GeneralButtonElementStyled>
  )
}

export default GeneralButtonElement