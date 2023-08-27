import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'
import { AuthContextProvider } from './hooks/AuthContext.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import RegisterPage from './pages/Register/RegisterPage.jsx'
import {ConfirmationCode} from './pages/ConfirmationCode/ConfirmationCode.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import Dashboard from './pages/DashBoard/Dashboard.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import ChangePassword from './pages/ChangePassword/ChangePassword.jsx'
import UserList from './pages/UserList/UserList.jsx'
import ProtectedCheckChildren from './components/ProtectedRoute/ProtectedCheckChildren.jsx'
import Setlists from './pages/Setlists/Setlists.jsx'
import Songs from './pages/Songs/Songs.jsx'
import Tags from './pages/Tags/Tags.jsx'
import Events from './pages/Events/Events.jsx'
import HomeLoggedOut from './pages/HomeLoggedOut/HomeLoggedOut.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>      
        <Routes>
          <Route path="/" element={<App />}>
          <Route index element={<HomeLoggedOut />} />
          <Route path="/home" element={ 
            <ProtectedRoute>
              <h1>This is another homepage</h1>
            </ProtectedRoute>
           } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/forgotPassword" element={ <ForgotPassword /> } /> 
          <Route path="/users/:pageReq" element={ <UserList /> } /> 
          <Route path="/users" element={ <UserList /> } /> 
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/songs" element={
            <ProtectedRoute>
              <Songs />
            </ProtectedRoute>
          } />
          <Route path="/tags" element={
            <ProtectedRoute>
              <Tags />
            </ProtectedRoute>
          } />
          <Route path="/setlists" element={
            <ProtectedRoute>
              <Setlists />
            </ProtectedRoute>
          } />
          <Route path="/changePassword" element={
            <ProtectedRoute>            
              <ChangePassword />
            </ProtectedRoute>
          }/>
          <Route path="/verifyCode" element={ 
            <ProtectedCheckChildren>
              <ConfirmationCode />
            </ProtectedCheckChildren> } />
          <Route path="/dashboard">
            <Route path="" element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute> 
            } />
            <Route path="/dashboard/edit/:userId" element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute> 
            } />
          </Route> 
        </Route>
      </Routes>        
      </AuthContextProvider>
    </BrowserRouter>  
  </React.StrictMode>
)
