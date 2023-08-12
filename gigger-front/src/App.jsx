
import './App.css'
import { Navigate, Outlet, redirect } from 'react-router-dom'
import HeaderMain from './components/HeaderMain/HeaderMain'
// import { socket } from './socket'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

  


function App() {
  useEffect(()=>{

    // socket.on('connect',console.log("HOLA!!!"))
    // socket.on('foo',console.log("HEY!!!"))
    // socket.on('disconnect',console.log("ADIOS!!!"))
    // socket.on('updated-setlist', console.log("Setlist updated"))
   
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
