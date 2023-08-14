import { styled } from "styled-components";

export const SongSelectStyled = styled.div`
    display: flex;
    flex-direction:row;
    justify-content: center;
    margin:2rem 0 0 0;
    background: linear-gradient(to left bottom, #ff007d, #ff7d00);
    gap:1rem;
`

export const SelectedSongsStyled = styled.div`
    width: 40vw;
`

export const SongSelectionListStyled = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
    width: 30vw;
`

export const SongToSelectStyled = styled.div`

    background: linear-gradient(to right bottom, #880000,#1c1c1c) ;
    padding: 1rem;
    margin: 0.2rem;
    border-radius: 10px;
    transition: all 1s linear 1s;
    &:hover {
        background: linear-gradient(to right bottom, #880000,#4f4f4f) ;
    }

`