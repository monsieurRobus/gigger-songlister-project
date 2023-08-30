import { styled } from "styled-components";

export const SongsMainStyled = styled.main`

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: start;
    margin-top: 10vh;
    width:100%;
    

`

export const TagsFilterSwitchDivStyled = styled.div`

    display: flex;
    width: 30vw;
    flex-direction:row;
    gap: 0.5rem;
    flex-wrap: wrap;


`

export const TagsFilterSwitchStyled = styled.button`

    width: 3rem;
    height: 2rem;
    flex-shrink: 1;
    font-size: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 1px 1px 1px #1c1c1c;
    box-shadow: 2px 2px 2px #1c1c1c;
    background-color: ${({colour})=>colour};
    transition: all 0.2s ease-in-out;


`

export const SongsSectionStyled = styled.section`

    display: flex;
    width: 50vw;
    min-height: 70vh;
    overflow-y: auto;

    @media (max-width: 700px) {

        width: 80vw;

        button {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            
        }

        h2 {
            font-size: 1rem;
        }

        h3 {
            font-size: 0.8rem;
        }


    }

`

export const FilterSectionStyled = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    gap:1rem;
    align-items: center;

`

export const SongsFormSectionStyled = styled.section`


    #react-tags {
        display: flex;
        width: 100%;
        div {
            width: 100%;
        }
        
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        list-style: none;
    }

    li {
        width: 20%;
        height: 32px;
        padding: 2rem;
        gap: 1rem;

        div {
            text-align: center;
            padding: 0.4em;
        }
    }

`

export const SongsTableStyled = styled.table`

`

export const SongTableRowStyled = styled.tr`
    background: linear-gradient(to right bottom, ${props=>props?.gradientcolors});
    border-radius: 20px;        
    opacity: 0.5;
`