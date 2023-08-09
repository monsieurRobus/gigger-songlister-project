
import './App.css'
import { Navigate, Outlet, redirect } from 'react-router-dom'
import HeaderMain from './components/HeaderMain/HeaderMain'

function App() {

  
  return (
      <main>
        <HeaderMain />
        <Outlet />
      </main>
  )
}

export default App
