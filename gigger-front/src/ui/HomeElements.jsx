import { styled } from "styled-components";
import header1 from '../assets/header1.png'
import header2 from '../assets/header2.png'
import header3 from '../assets/header3.png'

export const HomeTitleStyled = styled.div`
    padding:0;
    margin-top: 10vh;
    height: 50vh;
    width: 100%;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1,h2{
        padding: 0;
        margin:0;
    }

    .hero-section-background {
        overflow: hidden;
        position: relative;
        width:100%;
        height: inherit;
    }

    .hero-section-titles {
        position: absolute;
        padding: 0 4em;

        h1,h2 {
            color: #f5f5f5;
            text-shadow: 2px 2px 2px #1c1c1c;
        }

        

    }

    .hero-section-background .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        animation: slider 16.5s infinite;

    }

    .hero-section-background .slide:nth-child(1) {
   background-image: url(${header1});
   animation-delay: 0s;
}

    .hero-section-background .slide:nth-child(2) {
    background-image: url(${header2});
    animation-delay: -5.5s;
    }

    .hero-section-background .slide:nth-child(3) {
    background-image: url(${header3});
    animation-delay: -11s;
    }

    @keyframes slider {
        0%, 20%, 100% {
            opacity: 1;
            animation-timing-function: ease-in-out;
            z-index: 0;
        }
        33% {
            opacity: 0;
            animation-timing-function: step-end;
            z-index: 0;
        }
        90% {
            opacity: 1;
            animation-timing-function: ease-in-out;
            z-index: -1;
        }
    }
`

export const HomeIntroSectionStyled = styled.section`

    
width: 100%;
    p {
        max-width: 80%;
        font-size: 3em;
    }

    h1, h2 {
        font-size: 5em;
    }

    @media (max-width: 700px) {

        padding:0;

    }

`

export const HomeIntroCardsSectionStyled = styled.section`
    
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;

    figure {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 20%;
    }

    @media (max-width: 700px) {
    
    figure {
        width: 100%;
    }
    
    }
`

export const HomeCardStyled = styled.figure`

    font-size: 4em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    h1,h2, h3, h4, h5, h6 {
        font-size: 0.3em;
    }
    p {
        font-size: 1.2rem;
    }
`