import {useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import SuccessAlert from '../../components/alert/SuccessAlert'
import ErrorAlert from '../../components/alert/ErrorAlert'

const AllWithdrawalRequests = ({baseUrl}) => {
    const [loading, setLoading] = useState(false)
    const [allWithdrawals, setAllWithdrawals] = useState()
    const [withdrawalRequestModal, setWithdrawalRequestModal] = useState(false)
    const [withdrawalRequest, setWithdrawalRequest] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const admin = JSON.parse(localStorage.getItem("admin"))

    useEffect(() => {
        getAllWithdrawalRequest()
    },[])

    async function getAllWithdrawalRequest(){
        const response = await fetch(`${baseUrl}/change-profit-payment-status/1/`,{
            headers:{
                Authorization: `Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        setAllWithdrawals(data.reverse())
        console.log(data)
    }

    function viewWithrawalDetails(id){
        setWithdrawalRequestModal(true)
        const withdrwal = allWithdrawals.find(withdrawal => withdrawal.id === id)
        setWithdrawalRequest(withdrwal)
        console.log(withdrwal)
    }

    async function approveWithdrawalRequest(id){
        const response = await fetch(`${baseUrl}/change-profit-payment-status/${id}/`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        if(response.ok){
            setWithdrawalRequestModal(false)
            setSuccess("Withdrawal Request has been approved successfully")
            getAllWithdrawalRequest()
        }
        if(!response.ok){
            setError(data.detail)
        }
        console.log(response, data)
    }

  return (
    <div>
        <Navbar />
        {loading && 
        <div className="center-loader">
                <i className="fa-solid fa-gear fa-spin" ></i>
            </div>
        }
        <div className="container-fluid dashboard-content pb-5">
            <div className="flex justify-between items-center border-b mb-5">
                <h1 className='text-[25px]'>All Withdrawal Requests</h1>
                {/* <button className="bg-[#1AC888] text-white py-1 px-2 rounded-sm" onClick={() => setFundAdminWallet(true)} >Fund Wallet</button> */}
            </div>
            <div className="flex justify-between pb-2 mb-2" style={{ borderBottom:"1px solid #000" }}>
                <p>Amount</p>
                <p>Status</p>
                <p>Confirm Status</p>
                <p>Currency</p>
                <p>Approve</p>
            </div>
            {allWithdrawals && 
                allWithdrawals.map(withdrawal => (
                    <div className="flex justify-between pb-2">
                        <p>{withdrawal.amount}</p>
                        <p>{withdrawal.status}</p>
                        <p>{(withdrawal.confirm_status).toString()}</p>
                        <p>{withdrawal.currency}</p>
                        <p className="bg-[#1AC888] text-white py-1 px-2 rounded-sm cursor-pointer" onClick={() => viewWithrawalDetails(`${withdrawal.id}`)} >View Request</p>
                    </div>
                ))
            }

        {withdrawalRequestModal && 
            <div className='transactionInfoModalBg'>
                <div className="transactinInfoModal relative">
                    <i className='ri-close-line absolute top-3 right-5 text-[22px] cursor-pointer font-bold' onClick={() => setWithdrawalRequestModal(!withdrawalRequestModal)}></i>
                    <div>
                        <p>Withdrawal Request Date</p>
                        <p>{(withdrawalRequest.created_at).slice(0, 10)}</p>
                    </div>
                    <div>
                        <p>Withdrawal Amount</p>
                        <p>{(withdrawalRequest.amount)}</p>
                    </div>
                    <div>
                        <p>Withdrawal Currency</p>
                        <p>{(withdrawalRequest.currency)}</p>
                    </div>
                    <div>
                        <p>Withdrawal Status</p>
                        <p>{(withdrawalRequest.status)}</p>
                    </div>
                    <div>
                        <p>Withdrawal Wallet Address</p>
                        <p>{(withdrawalRequest.wallet)}</p>
                    </div>
                    <button className='bg-[#1AC888] text-white py-1 px-2 rounded-sm cursor-pointer mt-2' onClick={() => approveWithdrawalRequest(`${withdrawalRequest.id}`)}>
                        Approve Withdrawal Request
                    </button>
                </div>
            </div>
        }
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
        {error && <ErrorAlert error={error} setError={setError}/>}
        </div>
    </div>
  )
}

export default AllWithdrawalRequests