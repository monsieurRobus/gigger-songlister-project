import { styled } from "styled-components";

export const SetlistMainStyled = styled.main`

display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: start;
    margin-top: 10vh;
    width:100%;

`
export const SetlistMainSectionStyled = styled.section`

display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: start;
    min-height: 70vh;
    z-index: 1;

`
export const SetlistBodyCardStyled = styled.div`
    display: flex;
    
    z-index: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
p {
    
    background-color: white;
    width: 80%;
    height: 80px;
    overflow: hidden;
}


`

export const SetlistFooterButtonsStyled = styled.div`

z-index: 1;

`