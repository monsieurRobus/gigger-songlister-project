
import styled from 'styled-components';

export const OpenModalStyled = styled.button`

    position:fixed;
    z-index: 999999;
    right: 20px;
    bottom: 20px;
    width: 64px;
    height: 64px;
    padding:0;
    margin: 0;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    border-radius: 50%;
    box-shadow: 2px 2px 2px #1c1c1c;
    color: #1c1c1c;
    font-size: 1em;
    transition: all 0.1s ease-in;
    &:hover {
        background-color:coral;
        font-weight: bolder;
        color: #ffdf66;
        border-color: none;
    }

    &:active {
        background-color: #ff7d00;
        transform: translateX(2px) translateY(2px);
    }

`

export const NumberOfSongsStyled = styled.div`
    z-index: 9999;
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 64px;
    height: 64px;
    background-color: #007dff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 50%;
    box-shadow: 2px 2px 2px #1c1c1c;
    h2 {
        margin: 0;
        font-size: 1em;
    }
    h3 {
        margin: 0;
        font-size: 0.8em;
    }

`

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
    display:${(props=>props?.owner) ? 'flex':'none'};
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
    max-width: 60px;
    border-radius: 2rem;
    padding: 0.5rem;
    box-shadow: 2px 2px 2px black;
    &:hover ${SpeechBubbleStyled} {
        visibility: visible;
    }
`

export const EventCalendarContentStyled = styled.div`
    font-size: 0.7em;
    background-color: yellow;
    
    color: black;
    padding:0;
    transition: all 0.4s;

    &:hover {
        background-color: red;
    }


`