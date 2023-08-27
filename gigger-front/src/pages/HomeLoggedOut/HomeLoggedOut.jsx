import React from 'react'
import { HomeCardStyled, HomeIntroCardsSectionStyled, HomeIntroSectionStyled, HomeTitleStyled } from '../../ui/HomeElements'
import { faCalendar, faGuitar, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GeneralButtonElement from '../../ui/GeneralButtonElement'

const HomeLoggedOut = () => {
  return (
    <>
        <HomeTitleStyled>
          <div className={'hero-section-background'}>
              <div className={'slide'}></div>
              <div className={'slide'}></div>
              <div className={'slide'}></div>
          </div>
          <div className={'hero-section-titles'}>
            <h1 id="home" className={'fade-in-title'}>Welcome to <span className={'gigger'}>gigger</span></h1>
            <h2>enjoy the stage</h2>
          </div>
            
        </HomeTitleStyled>
        <HomeIntroSectionStyled>
          <h1>Hello there!</h1>
          <p>Welcome to <span className={'feature'}>gigger</span>! Your ultimate tool for comprehensive music event management.</p>
          <p> Elevate your live performances with <span className={'feature'}>advanced setlist creation</span>, <span className={'feature'}>song control</span>, and <span className={'feature'}>event coordination features</span>. Streamline interactions with fans and clients for an <span className={'feature'}>unforgettable experience</span>. Discover the future of music management with GIGGER.</p>

        </HomeIntroSectionStyled>
        <HomeIntroSectionStyled className={'alternate'}>
          <HomeIntroCardsSectionStyled >
            <HomeCardStyled className={'card-main'}>
              <FontAwesomeIcon icon={faCalendar}/>
              <h2>Manage your events</h2>
              <p>Elevate your band's performance management with <span className={'gigger'}>gigger</span>. Seamlessly organize events, streamline setlists, and enhance client interactions. Your all-in-one solution for music event success.</p>
            </HomeCardStyled>
            <HomeCardStyled className={'card-main'}>
              <FontAwesomeIcon icon={faGuitar}/>
              <h2>Manage your repertoire</h2>
              <p>Effortlessly manage your songs with <span className={'gigger'}>gigger</span>. Organize, update, and optimize your music repertoire for seamless performances. Take control of your setlists like never before.</p>
            </HomeCardStyled>
            <HomeCardStyled className={'card-main'}>
              <FontAwesomeIcon icon={faComment}/>
              <h2>Improove your communication on-stage</h2>
              <p>Amplify your live communication with <span className={'gigger'}>gigger</span>. Engage seamlessly with fans and clients, enhancing the concert experience through real-time interaction and personalized connections. Elevate your performance engagement.</p>
            </HomeCardStyled>
          </HomeIntroCardsSectionStyled>
          
          <GeneralButtonElement type={'primary'} label={'Contact us'}/>
        </HomeIntroSectionStyled>
    </>
  )
}

export default HomeLoggedOut