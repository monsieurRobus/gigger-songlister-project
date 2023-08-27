import React, { useEffect } from 'react'
import { useAuth } from '../../hooks/AuthContext'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faHouse, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useDarkMode } from '../../hooks/useDarkMode'
import Toggle from '../../ui/Toggler'

const classActivePending = ({isActive,isPending}) => {
    return isActive ? 'active' : isPending ? 'pending' : ''
}

const LoggedNav =({handleLogout,avatar,img,chooseImage,theme,toggleTheme}) => (
    <header className={'main'}>
        <nav className={'loggedNav'}>
            <div className={'logo-header'}>
                <FontAwesomeIcon className={"logo"} icon={faCircleNotch} />
                <NavLink to="/" className={classActivePending}><span>gigger</span></NavLink>                
            </div>     
            <input id={"menu-toggle"} type="checkbox" />
            <label className={'menu-button-container'} htmlFor="menu-toggle">
                <div className={'menu-button'}></div>
            </label>

            

            <ul className={'navMenu'}>
            
            <li>
            <NavLink to='/home' className={classActivePending}><FontAwesomeIcon icon={faHouse} /></NavLink>
            </li>
            <li>
                <NavLink to='/users' className={classActivePending}>Users</NavLink>
            </li>
            <li>
                <NavLink to='/events' className={classActivePending}>Events</NavLink>
            </li>
            <li>
                <NavLink to='/setlists' className={classActivePending}>Setlist</NavLink>
            </li>
            <li>
                <NavLink to='/songs' className={classActivePending}>Songs</NavLink>
            </li>
            <li>
            
                <NavLink to='/tags' className={classActivePending}>Tags</NavLink>
            </li>
            <li className={"logout-responsive-dropdown"}>
                <Link  to='/dashboard'><img className={'avatar'} src={chooseImage?img:`https://api.dicebear.com/6.x/avataaars/svg?seed=${avatar}`} alt="user avatar"/></Link>
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faPowerOff} />
                </button>
            </li>
            </ul>
            <div className={"avatar-logout"}>   
                <Toggle theme={theme} toggleTheme={toggleTheme} />
                    <button className={"logout-responsive-menu"} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faPowerOff} />
                    </button>                
                <Link className={"dashboard-menu"} to='/dashboard'><img className={'avatar'} src={chooseImage?img:`https://api.dicebear.com/6.x/avataaars/svg?seed=${avatar}`} alt="user avatar"/></Link>
            </div>
            
        </nav>
    </header>
)
const NotLoggedNav = ({handleLogin,handleRegister, theme, toggleTheme}) => (
    <header className={'main'}>        
        <nav className={'notLoggedNav'}>
            <div className={'logo-header'}>
                <FontAwesomeIcon className={"logo"} icon={faCircleNotch} />
                <NavLink to="/" className={classActivePending}><span className={"title-header"}>gigger</span></NavLink>                
            </div>     
            <input id={"menu-toggle"} type="checkbox" />
            <label className={'menu-button-container'} htmlFor="menu-toggle">
                <div className={'menu-button'}></div>
            </label>

            

            <ul className={'navMenu'}>            
            
            <li>
                <NavLink to='/#what' className={classActivePending}>What is gigger?</NavLink>
            </li>            
            <li>
                <NavLink to='/songs' className={classActivePending}>Songs</NavLink>
            </li>
           
            <li className={"logout-responsive-dropdown"}>
                
                <button onClick={handleLogin}>login</button>
                <button onClick={handleRegister}>register</button>
                
            </li>
            </ul>
            <div className={"avatar-logout"}>   
                <Toggle theme={theme} toggleTheme={toggleTheme} />            
                    
                <button className={"dashboard-menu"} onClick={handleLogin}>login</button>
                <button className={"dashboard-menu"} onClick={handleRegister}>register</button>
                        
            </div>            
        
        </nav>
    </header>
)

const HeaderMain = ({theme,themeToggler}) => {
    
    const navigate = useNavigate()
    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogin = () => {
        navigate('/login')
    }

    const { user, logout } = useAuth()

    useEffect(() => {

    },[user])

    return user ? <LoggedNav handleLogout={logout} theme={theme} toggleTheme={themeToggler} avatar={user.avatar} img={user.image} chooseImage={user.chooseImage}/> : <NotLoggedNav theme={theme} toggleTheme={themeToggler} handleRegister={handleRegister} handleLogin={handleLogin}/>

 
    
  
}

export default HeaderMain