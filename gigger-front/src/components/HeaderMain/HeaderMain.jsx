import React, { useEffect } from 'react'
import './HeaderMain.css'
import { useAuth } from '../../hooks/AuthContext'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

const classActivePending = ({isActive,isPending}) => {
    return isActive ? 'active' : isPending ? 'pending' : ''
}

const LoggedNav =({handleLogout,avatar,img,chooseImage}) => (
    <header className={'main'}>
        <nav className={'loggedNav'}>
            <div>
                <NavLink to="/" className={classActivePending}><span>RegisterFull</span></NavLink>
            </div>     
            <div className={'navMenu'}>
            <NavLink to='/users' className={classActivePending}>Users</NavLink>
            <NavLink to='/events' className={classActivePending}>Events</NavLink>
            <NavLink to='/setlists' className={classActivePending}>Setlist</NavLink>
            <NavLink to='/songs' className={classActivePending}>Songs</NavLink>
            <NavLink to='/tags' className={classActivePending}>Tags</NavLink>
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faPowerOff} />
                </button>
                <Link to='/dashboard'><img className={'avatar'} src={chooseImage?img:`https://api.dicebear.com/6.x/avataaars/svg?seed=${avatar}`} alt="user avatar"/></Link>
            </div>
        </nav>
    </header>
)
const NotLoggedNav = ({handleLogin}) => (
    <header className={'main'}>
        <nav className={'notLoggedNav'}>
            <div>
                <span>Not logged ._.</span>
            </div>
            <div>
                <button onClick={handleLogin}>login</button>
            </div>
        </nav>
    </header>
)

const HeaderMain = () => {
    
    const navigate = useNavigate()

    const handleLogin = () => {
        console.log('login')
        navigate('/login')
    }

    const { user, logout } = useAuth()

    useEffect(() => {

    },[user])

    return user ? <LoggedNav handleLogout={logout} avatar={user.avatar} img={user.image} chooseImage={user.chooseImage}/> : <NotLoggedNav handleLogin={handleLogin}/>

 
    
  
}

export default HeaderMain