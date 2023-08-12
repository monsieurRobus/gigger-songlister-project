
import styled from 'styled-components';



export const CloseButtonStyled = styled.span`
    top:-16px;
    padding: 0.4rem;
    right:0;
    background-color: red;   
    position:absolute;
    cursor:pointer; 
    width:20px;
    height:20px;
    align-items: center;
    justify-content:center;
    display:flex;
    border-radius: 50%;    
    box-shadow: 2px 2px 2px black;
`

export const SpeechBubbleStyled = styled.div`
    top:20px;
    left: -20px;
    display:flex;
    color: black;
    width: 100%;
    visibility: hidden;
    position:absolute;
    background-color: white;
    padding:1rem;
    box-shadow: 4px 4px 4px black;
    border-radius: 10px;
    
`
export const TagBubbleStyled = styled.div`
	background-color: ${props=>props?.color};
    border-radius: 2rem;
    padding: 1rem;
    text-shadow: 1px 1px 1px black;
    position:relative;
    box-shadow: 2px 2px 2px black;
    &:hover ${SpeechBubbleStyled} {
        visibility: visible;
    }
`