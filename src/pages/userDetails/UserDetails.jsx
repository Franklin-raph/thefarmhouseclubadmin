import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'

const UserDetails = ({baseUrl}) => {
    const {id} = useParams()
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [userDetails, setUserDetails] = useState()

    const tabsArray = ['Profile Details','Account Details','Wallet Address Details','Security Details','Transaction Details']
    const [activeTab, setActiveTab] = useState(tabsArray[0]);

    useEffect(() => {
        getUserDetails()
    },[])

    async function getUserDetails () {
        const response = await fetch(`${baseUrl}/users/?id=${id}`,{
            headers:{
                Authorization:`Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        setUserDetails(data)
        console.log(data)
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    
  return (
    <div>
        <Navbar />
        {userDetails && 
            <>
            <div class="container-fluid dashboard-content mb-5">
                <div className="userTabNav inline-flex items-center gap-10 bg-white shadow-md rounded-full px-3 py-3 mb-5" style={{ border:"1px solid #ccc" }}>
                    {tabsArray.map((tab, index) => (
                        <p
                        key={index}
                        className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab)}
                        >{tab}</p>
                    ))}
                </div>
                {activeTab === "Profile Details" && 
                    <>
                        <div>
                            <h1 className='text-[25px] mb-3 border-b'>User Details</h1>
                            <div className='flex items-center gap-10 text-lg'>
                                <div className='flex items-center gap-1'>
                                    <h3 className='font-bold'>First Name:</h3>
                                    <p>{userDetails.first_name}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <h3 className='font-bold'>Last Name:</h3>
                                    <p>{userDetails.last_name}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <h3 className='font-bold'>First Name:</h3>
                                    <p>{userDetails.username}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <h1 className='text-[25px] mb-3 border-b'>User Contact Details</h1>
                            <div className='flex items-center gap-10 text-lg mt-6'>
                                <div className='flex items-center gap-1'>
                                    <h3 className='font-bold'>User Email:</h3>
                                    <p>{userDetails.email}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <h3 className='font-bold'>Phone Number:</h3>
                                    <p>{userDetails.phone_num}</p>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <h3 className='font-bold'>Login Provider:</h3>
                                    <p>{userDetails.provider}</p>
                                </div>
                            </div>
                        </div>
                    </>
                }

                {activeTab === "Account Details" &&
                    <div>
                        <h1 className='text-[25px] mb-3 border-b'>User Bank Details</h1>
                        <div className='flex items-center gap-10 text-lg'>
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Bank Name:</h3>
                                <p>{userDetails.bank_name === null ? <p>N/A</p> : <p>{userDetails.bank_name}</p> }</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Acount Name:</h3>
                                <p>{userDetails.account_name === null ? <p>N/A</p> : <p>{userDetails.account_name}</p> }</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Account Number:</h3>
                                <p>{userDetails.account_number === null ? <p>N/A</p> : <p>{userDetails.account_number}</p> }</p>
                            </div>
                        </div>
                    </div>
                }

                {activeTab === "Wallet Address Details" &&
                    <div>
                        <h1 className='text-[25px] mb-3 border-b'>User Wallet Address Details</h1>
                        <div className='flex items-center gap-10 text-lg'></div>
                    </div>
                }

                {activeTab === "Security Details" &&
                    <div>
                        <h1 className='text-[25px] mb-3 border-b'>User Security Details</h1>
                        <div className='flex items-center gap-10 text-lg'>
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Has 2fa:</h3>
                                <p>{userDetails.has2fa.toString()}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Has Changed Password:</h3>
                                <p>{userDetails.has_changed_password.toString()}</p>
                            </div>
                        </div>
                        <div className="flex item-center gap-10 text-xl mt-3">
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Is Verified:</h3>
                                <p>{userDetails.is_verified.toString()}</p>
                            </div>
                            <div className='flex items-center gap-1'>
                                <h3 className='font-bold'>Is Active:</h3>
                                <p>{userDetails.is_active.toString()}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            </>
        }
        
    </div>
  )
}

export default UserDetails