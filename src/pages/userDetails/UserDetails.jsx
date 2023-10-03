import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'

const UserDetails = ({baseUrl}) => {
    const {id} = useParams()
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [userDetails, setUserDetails] = useState()

    const tabsArray = ['Profile Details','Account Details','Wallet Address Details','Security Details','Transaction Details','Staked Projects', 'KYC']
    const [activeTab, setActiveTab] = useState(tabsArray[0]);
    const [allUsersTransactions, setAllUsersTransactions] = useState([])
    const [singleTransacionInfo, setSingleTransacionInfo] = useState()
    const [transactioInfoModal, setTransactioInfoModal] = useState(false)
    const [userStakedProject, setUserStakedProjectsArray] = useState([])
    const [investmentDetail, setInvestMentDetail] = useState()
    const [loading, setLoading] = useState(false)
    const [verifyUerKycModal, setVerifyUerKycModal] = useState(false)
    const [userKYCDetails, setUserKYCDetails] = useState()

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

    async function getUsersStackedProjects(){
        const response = await fetch(`${baseUrl}/my-investments/`,{
          headers:{
            Authorization: `Bearer ${admin.access}`
          }
        })
        const data = await response.json()
        setUserStakedProjectsArray(data)
        console.log(response, data)
      }

    async function getUserTransactionDetails(){
        const response = await fetch(`${baseUrl}/my-account-history/${userDetails.user_wallet}`,{
            headers:{
                Authorization:`Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        setAllUsersTransactions(data)
        console.log(response, data)
    }

    const handleTabClick = (tab) => {
        console.log(tab)
        setActiveTab(tab);
        if(tab === 'Transaction Details'){
            getUserTransactionDetails()
        }
        if(tab === 'Staked Projects'){
            getUsersStackedProjects()
        }
        if(tab === 'KYC'){
            getUserKycData()
        }
      };

      const openTransactionModalInfo = (id) => {
        let detailInfo = allUsersTransactions.find(transaction => transaction.id === id)
        console.log(detailInfo)
        setSingleTransacionInfo(detailInfo)
        setTransactioInfoModal(true)
    }

    async function getInvestMentDetail(id){
        const response = await fetch(`${baseUrl}/my-investment-detail/${id}/`,{
            headers:{
                Authorization:`Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        if(response.ok){
            setInvestMentDetail(data)
        }
        console.log(response, data)
    }

    async function getUserKycData(){
        setLoading(true)
        const response = await fetch(`${baseUrl}/verify-card-kyc/?user_id=${id}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${admin.access}`
            },
        })
        const data = await response.json()
        console.log(data)
        if(response) setLoading(false)
        if(response.ok){
            setUserKYCDetails(data)
        }
    }

    async function verifyUserKycDetails(){
        setLoading(true)
        const response = await fetch(`${baseUrl}/verify-user-acc/${id}/`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${admin.access}`
            },
        })
        if(response) setLoading(false)
        const data = await response.json()
        console.log(data)
    }
    
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
                            style={{ fontSize:"14px" }}
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
                            <div className='flex items-center gap-3 text-lg'>
                                <h3 className='font-bold'>User Wallet Addresss:</h3>
                                <p>{userDetails.user_wallet}</p>
                            </div>
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

                    {activeTab === "Transaction Details" &&
                    <>
                        {allUsersTransactions && 
                            allUsersTransactions.map(transaction => (
                                <div className='flex items-center justify-between cursor-pointer rounded-md hover:bg-gray-700 p-3 mb-0 proposalTile' onClick={() => openTransactionModalInfo(`${transaction.id}`)}>
                                    <p className='text-gray-500 font-[500]'>{transaction.transaction_type}</p>
                                    <p>{transaction.amount}</p>
                                    {   transaction.status === "failed" ? 
                                        <p className='border px-3 py-1 rounded-md border-red-500 text-red-500'>{transaction.status}</p>
                                        :
                                        transaction.status === "success" ? 
                                        <p className='border px-3 py-1 rounded-md border-[#1AC888] text-[#1AC888]'>{transaction.status}</p>
                                        :
                                        transaction.status === "Canceled" ? 
                                        <p className='border px-3 py-1 rounded-md border-gray-500 text-gray-500'>{transaction.status}</p>
                                        :
                                        <p className='border px-3 py-1 rounded-md border-yellow-500 text-yellow-500'>{transaction.status}</p>
                                    }
                                </div>
                            ))
                        }
                    </>
                    }

                    {activeTab === "Staked Projects" &&
                    <>
                        {userStakedProject && 
                            userStakedProject.map((project, index) => (
                                <div className='flex items-center gap-2 cursor-pointer rounded-md hover:bg-gray-700 p-3 mb-0 proposalTile' onClick={() => getInvestMentDetail(`${project.id}`)}>
                                    <p>{index + 1}.</p>
                                    <p>{project.project_name}</p>
                                </div>
                            ))
                        }
                    </>
                    }

                    {activeTab === "KYC" &&
                    <>
                        {userKYCDetails && 
                            <div>
                                <img src={userKYCDetails.id_card} alt="" />
                                <div className='flex items-center gap-2 mt-3'>
                                    <h2 className='font-bold'>First name:</h2>
                                    <p>{userDetails.first_name}</p>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <h2 className='font-bold'>Last name:</h2>
                                    <p>{userDetails.last_name}</p>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                    <h2 className='font-bold'>Email:</h2>
                                    <p>{userDetails.email}</p>
                                </div>
                                <div className='flex items-center gap-2 mt-3'>
                                <button className='bg-[#1AC888] text-white rounded-sm py-2 px-4' onClick={() => setVerifyUerKycModal(true)}>Verify User</button>
                                </div>
                            </div>
                            // userStakedProject.map((project, index) => (
                            //     <div className='flex items-center gap-2 cursor-pointer rounded-md hover:bg-gray-700 p-3 mb-0 proposalTile' onClick={() => getInvestMentDetail(`${project.id}`)}>
                            //         <p>{index + 1}.</p>
                            //         <p>{project.project_name}</p>
                            //     </div>
                            // ))
                        }
                    </>
                    }
                    {verifyUerKycModal &&
                    <div className="twoFactorModalBg transactionModal">
                        <div className='twoFactorModal'>
                            <h2 className='font-bold mb-2'>Verify User Kyc Details</h2>
                            <p>Are you sure you want to verify user KYC details?</p>
                            <div className='mt-4'>
                                {loading ?
                                    <button className='bg-[#1AC888] text-white rounded-sm py-1 px-2 mr-3'>
                                        <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                                    </button>
                                    :
                                <button className='bg-[#1AC888] text-white px-2 py-1 rounded-sm mr-3' onClick={verifyUserKycDetails}>Yes</button>
                                }
                                <button className='bg-red-600 text-white px-2 py-1 rounded-sm' onClick={() => setVerifyUerKycModal(!verifyUerKycModal)}>No</button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </>
        }

        {investmentDetail &&
            <div className="twoFactorModalBg transactionModal">
                <div className="twoFactorModal relative text-start">
                    <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setInvestMentDetail(false)}></i>
                    <h1 className='font-[600] text-left border-b mb-3'>Project Detail</h1>
                    <div>
                        <p>Project Name</p>
                        <p>{investmentDetail.project_name}</p>
                    </div>
                    <div className='my-3'>
                        <p>Profit Yield</p>
                        <p>{investmentDetail.my_profit}</p>
                    </div>
                    <div>
                        <p>Amount Invested</p>
                        <p>{investmentDetail.amount_invested}AVDA</p>
                    </div>
                </div>
            </div>
        }

        {transactioInfoModal && 
          <div className="twoFactorModalBg transactionModal">
            <div className="twoFactorModal relative text-start">
            <i className='ri-close-fill absolute top-3 right-5 cursor-pointer' onClick={(e) => setTransactioInfoModal(false)}></i>
              <h1 className='font-[500] mb-1 text-left border-b'>Transaction Details</h1>
              <div className='flex items-center justify-between'>
                <div className='my-3'>
                    <h3>Transaction Amount</h3>
                    <p>{singleTransacionInfo && singleTransacionInfo.amount}</p>
                </div>
                <div className='my-3'>
                    <h3>Transaction status</h3>
                    {singleTransacionInfo && singleTransacionInfo.status === "success" ? <p className='bg-[#1AC888] p-1 rounded text-white'>Successfull</p> : <p  className='bg-[#c81a1a] p-1 rounded'>Un-successfull</p> }
                    <p></p>
                </div>
              </div>
              <div className='my-3'>
                <h3>Transaction Description</h3>
                {singleTransacionInfo && singleTransacionInfo.description !== "" ? <p>{singleTransacionInfo && singleTransacionInfo.description}</p> : <p>No Description for this transaction</p>}
              </div>
              <div className='flex items-center justify-between'>
                <div className='my-3'>
                    <h3 >Transaction Date</h3>
                    <p>{new Date (singleTransacionInfo && singleTransacionInfo.timestamp).toString().split(" ").slice(0, 4).join(" ")}</p>
                </div>
                <div className='my-3'>
                    <h3>Transaction Time</h3>
                    <p>{new Date (singleTransacionInfo && singleTransacionInfo.timestamp).toString().split(" ").slice(4, 5).join(" ")}</p>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='my-3'>
                    <h3>Transaction ID</h3>
                    <p>{singleTransacionInfo && singleTransacionInfo.payment_reference}</p>
                </div>
                <div className='my-3'>
                    <h3>Transaction Type</h3>
                    <p>{singleTransacionInfo && singleTransacionInfo.transaction_type}</p>
                </div>
              </div>
              <div className='my-3'>
                    <h3>Account Funded?</h3>
                    <p>{(singleTransacionInfo && singleTransacionInfo.funded).toString()}</p>
                </div>
            </div>
          </div>
        }

    </div>
  )
}

export default UserDetails