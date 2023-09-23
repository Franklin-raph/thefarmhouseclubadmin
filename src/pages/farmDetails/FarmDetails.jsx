import React from 'react'
import Navbar from '../../components/navbar/Navbar'

const FarmDetails = () => {
  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-2 border-b'>Farm Details</h1>
            <div className='flex items-center justify-between gap-5'></div>
        </div>
    </div>
  )
}

export default FarmDetails