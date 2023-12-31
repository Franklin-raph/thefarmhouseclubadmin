import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/Asset-2.-300x47.png'

const Navbar = () => {

    const navigate = useNavigate()
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        checkTokenStatus()
        
        const interval = setInterval(() => {
            checkTokenStatus()
          }, 300000);
        
        return () => clearInterval(interval);
    },[])

    function logoutUser(){
        localStorage.clear()
        navigate("/")
    }

    async function checkTokenStatus(){
        console.log("Checking Token Status")
        const response = await fetch(`https://app1.thefarmhouseclub.io/api/v1/token-status/${admin.access}`)
        const data = await response.json()
        console.log(response)
        if(response.status === 400){
            logoutUser()
        }
    }

  return (
    <div>
        <div id="content-wrapper" class="d-flex flex-column side-nav">
            <div id="content">
                <nav class="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>
                    <ul class="navbar-nav ml-auto">
                        <div class="topbar-divider d-none d-sm-block"></div>
                        <li class="nav-item dropdown no-arrow relative">
                            <div class="nav-link dropdown-toggle" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setDropDown(!dropDown)}>
                                <span class="mr-2 d-none d-lg-inline text-gray-600 small">{admin.user.first_name} {admin.user.last_name}</span>
                                <i class="ri-arrow-down-s-line cursor-pointer"></i>
                            </div>
                            {dropDown &&
                            <div onClick={logoutUser} className="flex gap-2 items-center absolute bg-white py-2 px-3 right-0 top-[50px] cursor-pointer" style={{ boxShadow:"0 0 10px #ccc" }}>
                                <i class="ri-logout-circle-line"></i>
                                <p>Logout</p>
                            </div>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <ul class="navbar-nav sidebar sidebar-dark accordion side-nav" style={{ backgroundColor:"#fff", boxShadow:"0 0 10px #ccc" }} id="accordionSidebar">
            <a href="/">
                <img src={logo} alt="" />
            </a>
            <li class="nav-item active" onClick={() => navigate("/dashboard")}>
                <Link to="/dashboard" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/newinvestment" class="nav-link">
                    <i class="ri-add-circle-fill text-[26px]"></i>
                    <span>New Investment</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/allwalletaddress" class="nav-link">
                    <i class="ri-wallet-3-fill text-[26px]"></i>
                    <span>All Wallet Addresses</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/allwithdrawalrequests" class="nav-link">
                    <i class="ri-wallet-3-fill text-[26px]"></i>
                    <span>All Withdrawal Requests</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/allsecondaryinvestorsrequests" class="nav-link">
                    <i class="ri-wallet-3-fill text-[26px]"></i>
                    <span>Secondary Investors Requests</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/newfarmlocation" class="nav-link">
                    <i class="ri-add-circle-fill text-[26px]"></i>
                    <span>Enter New Farms</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/map" class="nav-link">
                    <i class="ri-road-map-fill text-[26px]"></i>
                    <span>View Map</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link to="/allfarms" class="nav-link">
                    <i class="ri-road-map-fill text-[26px]"></i>
                    <span>All Farms</span>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar