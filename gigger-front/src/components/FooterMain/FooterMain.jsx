import React from 'react'
import { styled } from 'styled-components'
import header2 from '../../assets/header2.png'
const FooterMainStyled = styled.footer`
    position:relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${header2});
    color: #f5f5f5;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: space-between;
    align-items: flex-end;
    height: 20vh;
    div.background {
        width: inherit;
        height: inherit;
        background-color: #363636;
        opacity: 0.7;
        z-index:0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    p {
        z-index: 999;
    }
`


const FooterMain = () => {
  return (
    <FooterMainStyled>
        <div className={'background'}></div>
        <p>Made with ❤️ and ☕ by Carlos Díaz</p>
    </FooterMainStyled>
  )
}

export default FooterMain