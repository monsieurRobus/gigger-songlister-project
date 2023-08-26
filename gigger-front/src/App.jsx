
import './App.css'
import { Navigate, Outlet, redirect } from 'react-router-dom'
import HeaderMain from './components/HeaderMain/HeaderMain'
// import { socket } from './socket'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { parseJwt, token } from './utils/token'
import { useAuth } from './hooks/AuthContext'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './ui/GlobalStyles'
import { darkTheme, lightTheme } from './ui/Theme'
import { useDarkMode } from './hooks/useDarkMode'




function App() {
  
  const {logout} =useAuth()
  const [theme,themeToggler] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

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
    <ThemeProvider theme={themeMode}>
    <main>
    <GlobalStyles/>
      <Toaster position="bottom-right" richColors  />
      <HeaderMain theme={theme} themeToggler={themeToggler}/>
      <Outlet />
    </main>
    </ThemeProvider>
  )
}

export default App
