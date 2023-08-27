import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import RegisterForm from '../../components/RegisterForm/registerForm'
const RegisterPage = () => {
  return (
    <main className={'register-wrapper'}>
      <div className={'register-box'}>
        <FontAwesomeIcon className="logo" icon={faCircleNotch} />
        <h1 className={'feature'}>gigger</h1>
        <RegisterForm />
      </div>        
    </main>
  )
}

export default RegisterPage