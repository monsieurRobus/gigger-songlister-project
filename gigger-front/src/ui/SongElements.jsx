import { styled } from "styled-components";

export const SongsMainStyled = styled.main`

    display: flex;
    margin-top: 10vh;

`

export const SongsSectionStyled = styled.section`

    display: flex;
    width: 40vw;
    min-height: 70vh;

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