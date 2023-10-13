import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const AllSecondaryInvestorRequest = ({baseUrl}) => {
    useEffect(() => {
        getAllSecondaryRequests()
    },[])
    
    const [allSecondaryRequests, setAllSecondaryRequests] = useState([])
    const [loading, setLoading] = useState(false)
    const [secInvestorModal, setSecInvestorModal] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()


    const admin = JSON.parse(localStorage.getItem("admin"))

    async function getAllSecondaryRequests(){
        setLoading(true)
        const response = await fetch(`${baseUrl}/account-upgrade-request/`,{
        headers:{
            Authorization:`Bearer ${admin.access}`
        }
    })
    const data = await response.json()
    if(response) setLoading(false)
    if(response.ok){
        setAllSecondaryRequests(data)
    }
    console.log(data)
    }

    function getSecInvstUser(id){
        console.log(id)
        const secondaryInvestorInfo = allSecondaryRequests.find(secondaryinvestor => secondaryinvestor.user.id === id)
        setSecInvestorModal(secondaryInvestorInfo)
        console.log(secondaryInvestorInfo)
    }

    async function confirmSecondaryInvestor(id){
        setLoading(true)
        const response = await fetch(`${baseUrl}/account-upgrade-request/?id=${id}`,{
            method:"PATCH",
            body: JSON.stringify({confirmed:"true"}),
            headers:{
                Authorization:`Bearer ${admin.access}`,
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()
        if(response) setLoading(false)
        if(response.ok){
            setSecInvestorModal(false)
            setSuccess("Users request to become a secondary investor has been granted successfully")
            getAllSecondaryRequests()
        }
        if(!response.ok){
            setError("users request to become a secondary investor was not granted")
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
            <div className='flex items-center justify-between mb-2 border-b border-black'>
                <p>First Name</p>
                <p>Last Name</p>
                <p>Secondary Investor</p>
            </div>
            {allSecondaryRequests && 
                allSecondaryRequests.map(secondaryRequest => (
                    <div onClick={() => getSecInvstUser(`${secondaryRequest.user.id}`)} className='flex items-center justify-between my-4 cursor-pointer hover:bg-[#ccc] py-1 px-3'>
                        <p>{secondaryRequest.user.first_name}</p>
                        <p>{secondaryRequest.user.last_name}</p>
                        <p>{secondaryRequest.comfirmed.toString()}</p>
                    </div>
                ))
            }
        </div>

        {secInvestorModal &&
            <div className="twoFactorModalBg transactionModal">
                {secInvestorModal.id}
                <div className='twoFactorModal'>
                    <h2 className='font-bold mb-2'>Confirm user as a secondary investor</h2>
                    <p>Are you sure you want to confirm this user as a secondary investor?</p>
                    <div className='mt-4'>
                        {loading ?
                        <button className='bg-[#1AC888] text-white rounded-sm py-1 px-2 mr-3'>
                            <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                        </button>
                        :
                        <button className='bg-[#1AC888] text-white px-2 py-1 rounded-sm mr-3' onClick={() => confirmSecondaryInvestor(secInvestorModal.id)}>Yes</button>
                        }
                        <button className='bg-red-600 text-white px-2 py-1 rounded-sm' onClick={() => setSecInvestorModal(!secInvestorModal)}>No</button>
                    </div>
                </div>
            </div>
        }
        {error && <ErrorAlert error={error} setError={setError}/>}
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
    </div>
  )
}

export default AllSecondaryInvestorRequest