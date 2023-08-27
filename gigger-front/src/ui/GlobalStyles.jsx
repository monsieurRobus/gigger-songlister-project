import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    width: 100%;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .fade-in-title { animation: fadeIn 5s; }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
    }

    .gigger {
            color: coral;
        }

    .alternate {
        background-color: ${({theme}) => theme.alternateBackground};
    }
    .feature {
        color: coral;
        text-shadow: 2px 2px 2px ${({theme})=> theme.featureShadow};
    }

  header {
    background: ${({ theme }) => theme.headerBody};
    transition: all 0.50s linear;

    .title-header{
        color: ${({theme}) => theme.headerTytle };
        font-size: 1.5em;
    }

    .loggedNav, .notLoggedNav {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    gap: 1rem;    
    padding: 1em;
    height: inherit;        
    box-sizing: border-box;    
        
        .logo-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .logo {
            height:32px;
            width: 32px;
            padding:0;
            margin:0;
        }

    }    

    img.avatar {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border-style: solid;        
        border-color: ${({theme})=> theme.border};
        transition: all 0.2s linear;
        &:hover {
            border-color: ${({theme})=> theme.borderHover};
        }
    }

    .navMenu {
        display:flex;
        flex-direction: row;
        justify-content:center;
        list-style-type: none;
        align-items:center;
        gap:2rem;
    }

    .navMenu > li {
        overflow: hidden;
    }

    .active {
        color:aquamarine
    }

    .menu-button-container {
        display: none;
        height: 100%;
        width: 30px;
        cursor: pointer;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #menu-toggle {
    display: none;  
    }

    .menu-button,
    .menu-button::before,
    .menu-button::after {
    display: block;
    background-color: #fff;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
    }

    .menu-button::before {
    content: '';
    margin-top: -8px;
    }

    .menu-button::after {
    content: '';
    margin-top: 8px;
    }

    #menu-toggle:checked + .menu-button-container .menu-button::before {
    margin-top: 0px;
    transform: rotate(405deg);
    }

    #menu-toggle:checked + .menu-button-container .menu-button {
    background: rgba(255, 255, 255, 0);
    }

    #menu-toggle:checked + .menu-button-container .menu-button::after {
    margin-top: 0px;
    transform: rotate(-405deg);
    }

    .logout-responsive-dropdown {
        display:none;
    }

    .avatar-logout {
        display: flex;
        justify-content: center;
        align-items: center;
        gap:1rem;
    }

  }

  header.main {
    position:fixed;
    width:100%;
    height:10vh;
    top:0;
    left:0;
    z-index: 9999;
}


.card-main {
    background-color: ${({theme})=> theme.cardBackground};
    border-radius: 10px;
    padding: 1em 0;
}



@media (max-width: 700px) {


    .logout-responsive-menu, .dashboard-menu {
        display:none;
    }

    .loggedNav, .notLoggedNav {
        padding: 1em;
    }

    .logout-responsive-dropdown {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        a{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        img.avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border-style: solid;
        
        border-color: ${({theme})=> theme.border};

        
        }

        button {
            width: 32px;
            height: 32px;
            margin: 0;
            padding:0;
        }
    }
    
    main{
        width: 100%;
    }

    header {
        
    .menu-button-container {
        display: flex;
    }
    .navMenu {
        position: absolute;
        top: 0;
        left: 0;
        flex-direction: column;
        width: 100%;
        margin-top:10vh;
        padding:0;
        gap:0;
        justify-content: center;
        align-items: center;
    }
    #menu-toggle ~ .navMenu li {
        height: 0;
        margin: 0;
        padding: 0;
        border: 0;
        transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    #menu-toggle:checked ~ .navMenu li {
        border: 1px solid #f2f2f2;
        height: 2.5em;
        padding: 0.5em 0;
        transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .navMenu > li {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0.5em 0;
        width: 100%;
        color: white;
        background-color: #f5f5f5;
    }
    .navMenu > li:not(:last-child) {
        border-bottom: 1px solid #444;
    }
    }
        
    }

  `
