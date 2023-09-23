import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'

const AllWalletAddress = ({baseUrl}) => {

    useEffect(() => {
        getAllAdminWalletsAddressess()
    },[])

    const [allAdminWalletAddress, setAllAdminWalletAddress] = useState([])
    const [loading, setLoading] = useState(false)

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

    async function getWalletTransactionDetails(walltetAddress){
        setLoading(true)
        const response = await fetch(`${baseUrl}/my-account-history/${walltetAddress}`,{
            headers:{
                Authorization:`Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        if(response) setLoading(false)
        console.log(response)
        console.log(data)
    }

  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-2 border-b'>Wallet Addresses</h1>
            {allAdminWalletAddress && 
            allAdminWalletAddress.map(adminWallet => (
                <div>
                    <h1 className='text-[20px] mt-5'>Title:    {adminWallet.title}</h1>
                    <div className='flex items-center justify-between'>
                        <p className='mt-2'>Public Key:   {adminWallet.public_key}</p>
                        {
                        loading ? 
                        <button className="bg-[#1AC888] text-white py-1 px-2 rounded-sm">
                            <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                        </button> 
                        : 
                        <button type='submit' className="bg-[#1AC888] text-white py-1 px-2 rounded-sm" onClick={() =>getWalletTransactionDetails(adminWallet.public_key)}> View Transaction </button>
                        }
                        {/* <button className='bg-[#1AC888]'>View Transaction</button> */}
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