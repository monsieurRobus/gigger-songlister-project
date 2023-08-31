import { styled } from "styled-components";

export const DashboardSectionStyled = styled.section`

    margin-top: 10vh;
    height:70vh;

    form {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }

`

export const DashboardDivWrapperStyled = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 6em;
`

export const DashboardAvatarThumbnailDivStyled = styled.div`

    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    

`

export const DashboardButtonDivStyled = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    button.delete {
        background-color: red;
        color: white;
    }
`

export const DashboardRowDivStyled = styled.div`

    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;

`
export const DashboardAvatarImageSelectionStyled = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;

`

export const DashboardEditProfileDivStyled = styled.div`

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1em;

`