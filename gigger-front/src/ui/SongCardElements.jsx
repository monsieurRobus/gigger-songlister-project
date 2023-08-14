import { styled } from "styled-components";


export const SpeechSongBubbleStyled = styled.div`

    top:20px;
    left: 20px;
    display:flex;
    color: black;
    align-items: center;
    visibility: hidden;
    position:absolute;
    background-color: white;
    padding:1rem;
    box-shadow: 4px 4px 4px black;
    border-radius: 10px;
    

`


export const SongCardStyled = styled.figure`
    padding: 0;
    margin: 0.4rem;
    &:hover ${SpeechSongBubbleStyled} {
        visibility: visible;
    }
`

export const BackgroundStyled = styled.div`
    background: linear-gradient(to right bottom, ${props=>props?.gradientcolors});
    border-radius: 20px;        
    opacity: 0.5;
    
`

