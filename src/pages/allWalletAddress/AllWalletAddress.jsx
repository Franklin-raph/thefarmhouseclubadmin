import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const AllWalletAddress = ({baseUrl}) => {

    useEffect(() => {
        getAllAdminWalletsAddressess()
    },[])

    const [allAdminWalletAddress, setAllAdminWalletAddress] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const admin = JSON.parse(localStorage.getItem("admin"))

    async function getAllAdminWalletsAddressess(){
        const response = await fetch(`${baseUrl}/admin-wallets/`,{
        headers:{
            Authorization:`Bearer ${admin.access}`
        }
    })
    const data = await response.json()
    if(response.ok){
        setAllAdminWalletAddress(data)
    }
    console.log(data)
    }

  return (
    <div>
        <Navbar />
        {loading && 
            <div className="center-loader">
                <i className="fa-solid fa-gear fa-spin" ></i>
            </div>
        }
        <div className="container-fluid dashboard-content mb-5">
            <h1 className='text-[25px] mb-2 border-b'>Wallet Addresses</h1>
            {allAdminWalletAddress && 
            allAdminWalletAddress.map(adminWallet => (
                <div>
                    <h1 className='text-[20px] mt-5 font-bold'>Title:    {adminWallet.title}</h1>
                    <div className='flex items-center justify-between'>
                        <p className='mt-2'>Public Key:   {adminWallet.public_key}</p>
                        <button type='submit' className="bg-[#1AC888] text-white py-1 px-2 rounded-sm" onClick={() =>navigate(`/wallet-transaction-details/${adminWallet.public_key}`)}> View Wallet Information </button>
                    </div>
                    {/* <p className='mt-2'>Secret Key:   Mr.Uchey, Glory said i should output the secret key, him wan <b>STEAL</b> our money. na thief him be sir i am making a suggestion, let's sack him before he bankrupt us</p> */}
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default AllWalletAddress