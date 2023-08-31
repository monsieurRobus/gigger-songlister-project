import { styled } from "styled-components";


export const ModalCloseButton = styled.span`

    color: #1c1c1c;
    position: absolute;
    z-index: 999999;
    top: 5px;
    right:5px;
    cursor: pointer;

`

export const ModalWrapperStyled = styled.div`

  display: ${(props)=>props.visible=="true"?'flex':'none'}; 
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;  
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 

`

export const ModalContentStyled = styled.div`


  margin: auto;
  display: flex;
  position: relative;
  justify-content: center;
  align-items:center;
  border: 1px solid #888;
  min-width: 70vw;
  min-height: 50vh;
  max-width: 90vw;
  border-radius: 20px;


`

export const ModalContentFormStyled = styled.form`

  display: flex;
  width: 70vw;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 3em;
  padding:1em;
  max-width:90vw;
  label {
    display: flex;
    gap: 15rem;
    justify-content: space-around;
    align-items: center;
    input {
    width: 40%;
  }
  }

  @media (max-width: 700px) {

    width:90vw;

    }

   
    


`
export const ModalSectionWrapperStyled = styled.div`
display: flex;
width: inherit;
flex-direction: row;
.modal-vertical {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50%;
    }
@media (max-width: 700px) {
  flex-direction: column;

}

`

export const ModalSectionStyled = styled.div`
  margin: 1rem;
  border-color: black; 
  border-width: 2px;
  border-style: solid;
  border-radius:16px;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  
  @media (max-width: 700px) {
  flex-direction: column;
  width: 100%;
  margin: 0;



}


  input {
    width: 80%;
  }

  .basic-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

    @media (max-width: 700px) {

      width:100%;

    }
  }

  .base-filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 0;
    padding: 0;

    @media (max-width: 700px) {

      width:100%;

      }
  }
  .tags-filters {
    width: 50%;
    height: inherit;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    

    .tags {
      display: flex;
      justify-content: center;
      gap:1rem;
      flex-wrap: wrap;
    }

    @media (max-width: 700px) {

    width:100%;

  }
  }

`
export const ModalSectionStyled2 = styled.div`
  margin: 0.1em;
  padding: 1em;
  border-color: black; 
  border-width: 2px;
  border-style: solid;
  border-radius:16px;
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  div.horizontal{
    margin: 1em;
    display: flex;
    flex-direction: row;
    width:100%;
  }


  @media (max-width: 700px) {
  flex-direction: column;
  width: 100%;
  margin: 0;



}


  input {
    width: 80%;
  }

  .basic-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;

    @media (max-width: 700px) {

      width:100%;

    }
  }

  .base-filters {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin: 0;
    padding: 0;

    @media (max-width: 700px) {

      width:100%;

      }
  }
  .tags-filters {
    width: 50%;
    height: inherit;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    

    .tags {
      display: flex;
      justify-content: center;
      gap:1rem;
      flex-wrap: wrap;
    }

    @media (max-width: 700px) {

    width:100%;

  }
  }

`