import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import LoginForm from '../../components/LoginForm/LoginForm'

const LoginPage = () => {
  return (
    <main className={'login-wrapper'}>
      <div className={'login-box'}>
        <FontAwesomeIcon className={"logo"} icon={faCircleNotch} />
        <h1 className={'feature'}>gigger</h1>
        <LoginForm />
      </div>        
    </main>
  )
}

export default LoginPage