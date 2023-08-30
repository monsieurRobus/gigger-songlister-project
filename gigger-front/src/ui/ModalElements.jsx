import { styled } from "styled-components";


export const ModalCloseButton = styled.span`

    color: #1c1c1c;
    position: absolute;
    z-index: 999999;
    top: 5px;
    right:5px;
    cursor: pointer;

`

export const ModalWrapperStyled = styled.div`

  display: ${(props)=>props.visible=="true"?'flex':'none'}; 
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;  
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 

`

export const ModalContentStyled = styled.div`


  background-color: #fefefe;
  margin: auto;
  display: flex;
    position: relative;
  justify-content: center;
  align-items:center;
  border: 1px solid #888;
  min-width: 70vw;
  min-height: 50vh;
  max-width: 90vw;
  border-radius: 20px;


`

export const ModalContentFormStyled = styled.form`

  display: flex;
  width: 70vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 2em;
  padding:1em;
  max-width:90vw;
  label {
    display: flex;
    justify-content: space-between;
  }


`