import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form'
import './RegisterForm.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/user.service'
import { useAuth } from '../../hooks/AuthContext'
import { useRegisterError } from '../../hooks/useRegisterError'



const RegisterForm = () => {

    const { register, handleSubmit, errors } = useForm()
    const { allUser, setAllUser, bridgeData } = useAuth()
    const [res, setRes] = useState({})
    const [send, setSend] = useState(false)
    const [registerOk, setRegisterOk] = useState(false)
    const [registerError, setRegisterError] = useState(false)    

    const navigate = useNavigate()
    
    const onFormSubmit = async (values) => {
      const valuesToSend =
      {
        name: values.username,
        password: values.password,
        email: values.email,
        avatar: values.avatar
      }
    
    setSend(true)
    setRes(await registerUser(valuesToSend))
    setSend(false)
    
    }

    useEffect(() => {
      useRegisterError(res, setRegisterOk, setRes, setAllUser)
      if (res?.status == 200) bridgeData("ALLUSER")
    }, [res])

    const onFormErrors = (errors) => {

      const errorFields = document.querySelectorAll(".error")

        for(const errorField of errorFields) {
            errorField.classList.remove("error")
        }
    
        for(const error in errors) {
            errors[error].ref.classList.add("error")
        }
    }

    if(registerOk) {
      return <Navigate to="/verifyCode" />
    }

    const handleLogin = () => {
      navigate("/login")
    }

  return (
    
        <section className={'register-box-inside'}>
            <form onSubmit={handleSubmit(onFormSubmit, onFormErrors)}>
                <div className={'register-form-row'}>                  
                  <label>Username</label>
                  <input type="text" name="name" {...register("username", {
                    required: true,
                    minLength: 3,
                })} />
                </div>
                <div className={'register-form-row'}>
                  <label>Password</label>
                  <input type="password" name="password" {...register("password", {
                    required: true,
                    minLength: 8,
                    vaidate: {
                        format: password => {
                            return (
                                /[A-Z]/g.test(password) &&
                                /[a-z]/g.test(password) &&
                                /[0-9]/g.test(password) 
                            )
                        } 
                    }
                })} />
                </div>
                <div className={'register-form-row'}>
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                    vaidate: {
                        format: password => {
                            return (
                                /[A-Z]/g.test(password) &&
                                /[a-z]/g.test(password) &&
                                /[0-9]/g.test(password) 
                            )
                        } 
                    }
                })} />
                </div>
                <div className={'register-form-row'}>
                  <label>Email</label>
                  <input type="email" name="email" {...register("email", {})} />
                </div>
                <div className={'register-form-row'}>
                  <label>Avatar seed</label>
                  <input type="text" name="avatar" {...register("avatar", {})} />
                </div>
                <div className={'register-buttons-row'}>
                  <button className={'primary btn'} type="submit" disabled={send}>Register</button>  
                  <button className={'secondary btn'} onClick={handleLogin} >Login!</button>
                </div>
                
            </form>
            
        </section>
    
  )
}

export default RegisterForm