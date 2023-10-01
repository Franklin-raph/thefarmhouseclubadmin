import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'

const WalletTransactionDetails = () => {
    const {walletAddress} = useParams()
    
    useEffect(() => {
        getWalletTransactionDetails()
    },[])

    const [loading, setLoading] = useState(false)
    const [walletTransactionDetails, setWalletTransactionDetails] = useState([])
    const [transactionInfoModal, setTransactionInfoModal] = useState()

    async function getWalletTransactionDetails(){
        setLoading(true)
        const response = await fetch(`https://horizon-testnet.stellar.org/accounts/${walletAddress}/transactions`)
        const data = await response.json()
        if(response.ok){
            setWalletTransactionDetails(data._embedded.records)
        }
        if(response) setLoading(false)
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
        <div className="container-fluid dashboard-content pb-5">
            <h1 className='text-[25px] border-b mb-5'>Transaction Details</h1>
            <div className='flex items-center justify-between my-3 border-b'>
                <p>Date</p>
                <p>Fee Charged</p>
                <p>Status</p>
                <p>Action</p>
            </div>
            <div>
                {walletTransactionDetails && 
                    walletTransactionDetails.map(walletTransaction => (
                        <div className='flex items-center justify-between my-3'>
                            <p>{(walletTransaction.created_at).toString().slice(0, 10)}</p>
                            <p>{(walletTransaction.fee_charged)}</p>
                            <p>{(walletTransaction.successful).toString()}</p>
                            <button className="bg-[#1AC888] text-white py-1 px-2 rounded-sm" onClick={() => viewTransactionInfo(`${walletTransaction.id}`)}>View Transaction</button>
                        </div>
                    ))
                }
            </div>
        </div>
        {transactionInfoModal && 
            <div className='transactionInfoModalBg'>
                <div className="transactinInfoModal relative">
                    <i className='ri-close-line absolute top-3 right-5 text-[22px] cursor-pointer font-bold' onClick={() => setTransactionInfoModal(!transactionInfoModal)}></i>
                    <div>
                        <p>Transaction Date</p>
                        <p>{(transactionInfoModal.created_at).toString().slice(0, 10)}</p>
                    </div>
                    <div>
                        <p>Fee Charged</p>
                        <p>{(transactionInfoModal.fee_charged).toString(0, 10)}</p>
                    </div>
                    <div>
                        <p>Fee Account</p>
                        <p>{transactionInfoModal.fee_account}</p>
                    </div>
                    <div>
                        <p>Transaction Date</p>
                        <p>{transactionInfoModal.source_account}</p>
                    </div>
                    <div>
                        <p>Transaction Status</p>
                        <p>{(transactionInfoModal.successful).toString()}</p>
                    </div>
                </div>
                
            </div>
        }
    </div>
  )
}

export default WalletTransactionDetails