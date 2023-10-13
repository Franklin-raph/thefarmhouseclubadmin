import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import SuccessAlert from '../../components/alert/SuccessAlert'
import ErrorAlert from '../../components/alert/ErrorAlert'

const WalletTransactionDetails = ({baseUrl}) => {
    const {walletAddress} = useParams()
    
    useEffect(() => {
        getWalletTransactionDetails()
    },[])

    const [loading, setLoading] = useState(false)
    const [walletTransactionDetails, setWalletTransactionDetails] = useState([])
    const [noData, setNoData] = useState("")
    const [transactionInfoModal, setTransactionInfoModal] = useState()
    const [fundAdminWallet, setFundAdminWallet] = useState(false)
    const [amount, setAmount] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const admin = JSON.parse(localStorage.getItem("admin"))

    async function getWalletTransactionDetails(){
        setLoading(true)
        const response = await fetch(`${baseUrl}/admin-account-history/${walletAddress}/`,{
            headers:{
                Authorization:`Bearer ${admin.access}`
            },
        })
        if(response) setLoading(false)
        const data = await response.json()
        console.log(data)
        if(response.ok){
            if(data.length === 0){
                setNoData("This wallet address has no transaction history yet")
                setWalletTransactionDetails([])
            }
        }
        if(response.ok){
            if(data.length > 0){
                setWalletTransactionDetails(data)
            }
        }
    }

    async function handleFundAdminWallet(){
        setLoading(true)
        console.log(JSON.stringify({amount:amount, public_key:walletAddress}))
        const response = await fetch(`${baseUrl}/fund-admin-wallet/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${admin.access}`
            },
            body: JSON.stringify({amount:amount, public_key:walletAddress})
        })
        const data = await response.json()
        if(response){
            setFundAdminWallet(false)
            setLoading(false)
        }
        console.log(data)
        if(response.ok){
            setSuccess("Wallet has been successfully funded")
        }
        if(!response.ok){
            setError(data.detail)
        }
    }

    function viewTransactionInfo(transactionId) {
        const transactioInfo = walletTransactionDetails.find(transaction => transaction.id === transactionId)
        setTransactionInfoModal(transactioInfo)
        console.log(transactioInfo)
        console.log(transactionId)
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
                <h1 className='text-[25px]'>Transaction Details</h1>
                <button className="bg-[#1AC888] text-white py-1 px-2 rounded-sm" onClick={() => setFundAdminWallet(true)} >Fund Wallet</button>
            </div>
            <div className='flex items-center justify-between my-3 border-b'>
                <p>Date</p>
                <p>Amount</p>
                <p>Status</p>
                <p>Action</p>
            </div>
            <div>
                {walletTransactionDetails && 
                    walletTransactionDetails.map(walletTransaction => (
                        <div className='flex items-center justify-between my-3'>
                            <p>{(walletTransaction.timestamp).toString().slice(0, 10)}</p>
                            <p>{(walletTransaction.amount)}</p>
                            <p>{(walletTransaction.status)}</p>
                            <button className="bg-[#1AC888] text-white py-1 px-2 rounded-sm" onClick={() => viewTransactionInfo(`${walletTransaction.id}`)}>View Transaction</button>
                        </div>
                    ))
                }
                {noData && <p className='font-bold text-2xl text-center mt-5'>{noData}</p> }
            </div>
        </div>

        {transactionInfoModal && 
            <div className='transactionInfoModalBg'>
                <div className="transactinInfoModal relative">
                    <i className='ri-close-line absolute top-3 right-5 text-[22px] cursor-pointer font-bold' onClick={() => setTransactionInfoModal(!transactionInfoModal)}></i>
                    <div>
                        <p>Transaction Date</p>
                        <p>{(transactionInfoModal.timestamp).toString().slice(0, 10)}</p>
                    </div>
                    <div>
                        <p>Amount</p>
                        <p>{(transactionInfoModal.amount)}</p>
                    </div>
                    <div>
                        <p>Description</p>
                        <p>{transactionInfoModal.description}</p>
                    </div>
                    <div>
                        <p>Transaction Type</p>
                        <p>{transactionInfoModal.transaction_type}</p>
                    </div>
                    <div>
                        <p>Transaction Status</p>
                        <p>{(transactionInfoModal.status)}</p>
                    </div>
                    <div>
                        <p>Source Account</p>
                        <p>{(transactionInfoModal.from_account)}</p>
                    </div>
                    <div>
                        <p>Destination Account</p>
                        <p>{(transactionInfoModal.to_account)}</p>
                    </div>
                </div>
            </div>
        }
        
        {fundAdminWallet && 
        <div className='transactionInfoModalBg'>
            <div className="transactinInfoModal relative lg:w-[35%] md:w-[50%] sm:w-[80%]">
                <i className='ri-close-line absolute top-3 right-5 text-[22px] cursor-pointer font-bold' onClick={() => setFundAdminWallet(!fundAdminWallet)}></i>
                <div className="flex flex-col">
                    <label> Amount </label>
                    <input type="number" onChange={e => setAmount(e.target.value)} style={{ border:"1px solid #333" }} className="mb-4 rounded-md mt-1 outline-none px-2 py-1 bg-transparent" placeholder='Enter withdrwal amount'/>
                </div>
                {loading ? 
                <button className="bg-[#1AC888] w-full py-1 rounded-[6px] text-center">
                    <i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i>
                </button> 
                :
                <button className="bg-[#1AC888] text-white py-1 px-2 rounded-sm w-full text-center" onClick={handleFundAdminWallet}>Fund</button>
                }
            </div>
        </div>
        }
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
        {error && <ErrorAlert error={error} setError={setError}/>}
    </div>
  )
}

export default WalletTransactionDetails