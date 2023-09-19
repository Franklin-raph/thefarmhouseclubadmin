import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signin from './authentication/signin/Signin'
import Dashboard from './pages/dashboard/Dashboard'
import NewInvestment from './pages/newInvestment/NewInvestment'
import UserDetails from './pages/userDetails/UserDetails'
import InvestMentDetails from './pages/investmentDetails/InvestMentDetails'

function App() {
  const baseUrl = "https://app1.thefarmhouseclub.io/api/v1"

  return (
    <HashRouter>
        <Routes >
          <Route path='/' element={<Signin baseUrl={baseUrl}/>}/>
          <Route path='/signin' element={<Signin baseUrl={baseUrl}/>}/>
          <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl}/>}/>
          <Route path='/newinvestment' element={<NewInvestment baseUrl={baseUrl}/>}/>
          <Route path='/userdetails/:id' element={<UserDetails baseUrl={baseUrl}/>}/>
          <Route path='/investmentdetails/:id' element={<InvestMentDetails baseUrl={baseUrl}/>}/>
        </Routes>
    </HashRouter>
  )
}

export default App
