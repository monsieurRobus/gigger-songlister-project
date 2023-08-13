
import './App.css'
import { Navigate, Outlet, redirect } from 'react-router-dom'
import HeaderMain from './components/HeaderMain/HeaderMain'
// import { socket } from './socket'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { parseJwt, token } from './utils/token'
import { useAuth } from './hooks/AuthContext'




function App() {

  const {logout} =useAuth()

  const checkValidToken = (decodedJwt)=> {
    if (decodedJwt.exp * 1000 < Date.now()) {
      logout()
    }
  }

  useEffect(()=>{

    const decodedToken= parseJwt(token())

    decodedToken ? checkValidToken(decodedToken) : null
   
  },[])
  
  return (
    <main>
      <Toaster position="bottom-right" richColors  />
      <HeaderMain />
      <Outlet />
    </main>
  )
}

export default App
