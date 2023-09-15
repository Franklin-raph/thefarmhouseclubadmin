import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signin from './authentication/signin/Signin'
import Signup from './authentication/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'

function App() {

  return (
    <HashRouter>
        <Routes >
          <Route path='/' element={<Signin />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
    </HashRouter>
  )
}

export default App
