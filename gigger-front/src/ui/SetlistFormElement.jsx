import { styled } from "styled-components";


export const SetlistFormFatherStyled = styled.section`

    width: 100%;
    height: 90vh;
    overflow-y: scroll;


`
export const PaginationSelectStyled = styled.div`

    display: flex;
    justify-content: column;
    align-items: center;
    min-width:5vw;

`
export const NavigationPageSelectStyled = styled.nav`

button {
    font-size: 0.5rem;
    
}

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
    display: flex;
    justify-content: center;
    align-items: start;
    ol {
        background-color: transparent;
    }

    @media (max-width: 700px) {
        width: 45vw;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        .duration {
            display:none;
        }

        
    }

    
`

export const SongSelectionListStyled = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
width: 25vw;
height: 70vh;
overflow-y: auto;

div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (max-width: 700px) {

    width:40%;

    div {
        gap:0.1rem;
    }
    gap:0.1rem;

  }
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
    border-radius: 16px;
    justify-content: space-between;
    box-shadow: 1px 1px 1px #1c1c1c;
    align-items: center;
    background: ${props=>'linear-gradient(to right bottom,'+props?.gradientcolors+')'};
    padding: 0 1rem;
    margin: 0.2rem;
    width: 100%;
    max-height: 80px;
    h3 {
        font-size: 1rem;
        max-height: 70px;
        overflow: hidden;
    }

    h4 {
        font-size: 0.6rem;
    }

    .label {
        display: flex;
        background-color: black;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        color: white;
        text-shadow: none;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        box-shadow: 1px 1px 1px white;
    
    }

    @media (max-width: 700px) {
        
        h4{
            display: none;
        }
        
        .label {
            width: 0.5rem;
            height: 0.5rem;
        }
        
    }


`

export const SongToSelectStyled = styled.div`

    transition: all 0.1s ease-in-out;
    background: ${props=>props.selected? 'linear-gradient(to right bottom, #7dbb00,#1c1c1c)' :'linear-gradient(to right bottom, '+props?.gradientcolors+')'} ;
    padding: 1rem;
    margin: 0.2rem;
    border-radius: 16px;
    box-shadow: ${props=>props.selected? '1px 1px 1px black':'5px 5px 5px black'};
    border-inline: ${props=>props.selected? '2px solid #7dff00':null};
    
    transform: ${props=>props.selected? 'translateX(4px) translateY(4px)' : 'translateX(0) translateY(0)' };
    &:hover {
        
        border-inline: 2px solid #f5f5f5; 
        background:  ${props=>props.selected? 'linear-gradient(to right bottom, #9fee00,#1c1c1c)' :'linear-gradient(to right bottom, #880000,#4f4f4f)'} ;
    
    }

    h3 {
        font-size: 1rem;
        
    }

    h4{
        font-size: 0.6rem;
    }

    .bottom-line{
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 700px) {

    width:20vw;

    h3 {
        font-size: 0.8rem;
        
    }

    h4{
        font-size: 0.6rem;
    }

    .bottom-line{
        gap:0;
        margin:0;
        padding:0;
        display: flex;
        flex-direction:column;
        align-items: start;
        justify-content: center;
    }

    }



`