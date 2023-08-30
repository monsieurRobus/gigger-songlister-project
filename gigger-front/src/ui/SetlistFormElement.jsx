import { styled } from "styled-components";


export const SetlistFormFatherStyled = styled.section`

    width: 100%;
    height: 90vh;
    overflow-y: scroll;


`

export const SongsBubbleStyled = styled.div`

    position: fixed; 
    

`
export const DurationBubbleStyled = styled.div`

z-index: 99990;
    position: fixed;
    bottom: 184px;
    left: 20px;
    width: 64px;
    height: 64px;
    background-color: #ff007d;
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

export const SongSelectStyled = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: center;
    margin:2rem 0 0 0;
    gap:1rem;
`



export const SelectedSongsStyled = styled.div`
    width: 35vw;
    height: 70vh;
    overflow: auto;
`

export const SongSelectionListStyled = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 25vw;
height: 70vh;
overflow-y: scroll;
`

export const SelectedSongListStyled = styled.ol`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 30vw;
    background-color: black;
    margin:0;
    padding: 0;
    
`

export const SetlistInfoStyled = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width:10vw;
    margin:0;
    padding: 0;
    background: linear-gradient(to top bottom, #ffdd00,#ff00dd);

`

export const SetlistBubbleMain = styled.div`
    z-index: 99990;
    position: fixed;
    bottom: 104px;
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

export const SongSelectedInListStyled = styled.li`

    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(to right bottom, #9fee00,#1c1c1c);
    padding: 0 1rem;
    margin: 0.2rem;
    width: 400px;
    height: 80px;
    
    h3 {
        font-size: 0.8rem;
    }

    h4 {
        font-size: 0.6rem;
    }


`

export const SongToSelectStyled = styled.div`

    background: ${props=>props.selected? 'linear-gradient(to right bottom, #7dbb00,#1c1c1c)' :'linear-gradient(to right bottom, '+props?.gradientcolors+')'} ;
    padding: 1rem;
    margin: 0.2rem;
    border-inline: ${props=>props.selected? '2px solid #7dff00':null};
    &:hover {
        
        border-inline: 2px solid #f5f5f5; 
        background:  ${props=>props.selected? 'linear-gradient(to right bottom, #9fee00,#1c1c1c)' :'linear-gradient(to right bottom, #880000,#4f4f4f)'} ;
    }

    h3 {
        font-size: 0.8rem;
        
    }

    h4{
        font-size: 0.6rem;
    }

`