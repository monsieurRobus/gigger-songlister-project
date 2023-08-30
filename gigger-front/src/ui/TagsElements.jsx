import { styled } from "styled-components";

export const TagsMainStyled = styled.main`
    margin-top:10vh;
    min-height: 70vh;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
`

export const TagsSectionWrapperStyled = styled.section`

    display: flex;
    padding: 2rem 0;
`

export const TagsTableStyled = styled.table`

    width:50vw;


    tr {

        padding:2rem;
        cursor: pointer;
        &:hover {
            background-color: coral;
        }
    }

    .name-column{
        width:30%;
        text-align:center;
    }

    .color-column{
        width:20%;        
        text-align:center;
    }

    .options-column {
        display: flex;
        text-align: center;
        justify-content: center;
        button {
            
        padding: 1em;
        }

        
    }


    @media (max-width: 700px) {

        .options-column {
            display: flex;
        text-align: center;

        button {
            padding: 0.8em;

        }
        
    }

    }

`

export const TagBubbleColourStyled = styled.span`

    color: ${(props)=>props.color}

`