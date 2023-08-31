import { styled } from "styled-components"


export const SetlistBackgroundStyled = styled.div`
  background: linear-gradient(to right top, #ff7d00,#ff007d) ;
  width: 100%;
  height: 100%;
  color: rgba(255,255,255,0.2);
  font-size: 5rem;
  overflow:hidden;
  border-radius: 30px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  position:absolute;  
  padding: 0;
  margin: 0;
  
`

export const SetlistBandBackgroundStyled = styled.h3`
  transform: rotateZ(40deg) translateX(-100px);
  width:200%;
  margin:0;
  padding: 0;
  line-height: 5rem;
`


export const SetlistCardStyled = styled.figure`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:1rem;
  position:relative;
  &:hover ${SetlistBackgroundStyled}{
    opacity: 0.8;
  }
  
`
