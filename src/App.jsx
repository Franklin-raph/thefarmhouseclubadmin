import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signin from './authentication/signin/Signin'
import Dashboard from './pages/dashboard/Dashboard'
import NewInvestment from './pages/newInvestment/NewInvestment'
import UserDetails from './pages/userDetails/UserDetails'
import InvestMentDetails from './pages/investmentDetails/InvestMentDetails'
import AllWalletAddress from './pages/allWalletAddress/AllWalletAddress'
import FarmLocation from './pages/farmLocation/FarmLocation'
import AllFarms from './pages/allFarms/AllFarms'
import FarmDetails from './pages/farmDetails/FarmDetails'
import Map from './pages/map/Map'
import WalletTransactionDetails from './pages/walletTransactionDetails/WalletTransactionDetails'
import AllWithdrawalRequests from './pages/allwithdrawalrequests/AllWithdrawalRequests'
import AllSecondaryInvestorRequest from './pages/allSecondaryInvestorRequest/AllSecondaryInvestorRequest'

function App() {
  const baseUrl = "https://app1.thefarmhouseclub.io/api/v1"

  return (
    <HashRouter>
        <Routes >
          <Route path='/' element={<Signin baseUrl={baseUrl}/>}/>
          <Route path='/signin' element={<Signin baseUrl={baseUrl}/>}/>
          <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl}/>}/>
          <Route path='/newinvestment' element={<NewInvestment baseUrl={baseUrl}/>}/>
          <Route path='/allwalletaddress' element={<AllWalletAddress baseUrl={baseUrl}/>}/>
          <Route path='/userdetails/:id' element={<UserDetails baseUrl={baseUrl}/>}/>
          <Route path='/investmentdetails/:id' element={<InvestMentDetails baseUrl={baseUrl}/>}/>
          <Route path='/map' element={<Map baseUrl={baseUrl}/>}/>
          <Route path='/newfarmlocation' element={<FarmLocation baseUrl={baseUrl}/>}/>
          <Route path='/allfarms' element={<AllFarms baseUrl={baseUrl}/>}/>
          <Route path='/farmdetails/:id' element={<FarmDetails baseUrl={baseUrl}/>}/>
          <Route path='/allwithdrawalrequests' element={<AllWithdrawalRequests baseUrl={baseUrl}/>}/>
          <Route path='/allsecondaryinvestorsrequests' element={<AllSecondaryInvestorRequest baseUrl={baseUrl}/>}/>
          <Route path='/wallet-transaction-details/:walletAddress' element={<WalletTransactionDetails baseUrl={baseUrl}/>}/>
        </Routes>
    </HashRouter>
  )
}

export default App
