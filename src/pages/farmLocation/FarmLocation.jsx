import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const FarmLocation = ({baseUrl}) => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [farm_size, setFarmSize] = useState("")
    const [state, setState] = useState("")
    const [lat, setLat] = useState("")
    const [long, setLong] = useState("")
    const [crop, setCrop] = useState("")
    const [farm_name, setFarmName] = useState("")
    const [full_name, setFullName] = useState("")
    const [phone, setPhoneNum] = useState("")
    const [loading, setLoading] = useState(false)
    const admin = JSON.parse(localStorage.getItem("admin"))

    async function postFarmDetails(){
        if(!farm_name || !farm_size || !state || !lat || !long || !crop || !full_name || !phone){
            setError("Please fill in all fields")
        }else{
            setLoading(true)
            const response = await fetch(`${baseUrl}/farm-details/`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${admin.access}`
                },
                body: JSON.stringify({farm_name:farm_name, farm_size:farm_size, state:state, lat:lat, 
                                    long:long, crop:crop, full_name:full_name, phone:phone})
            })
            if(response) setLoading(false)
            if(response.ok){
                setSuccess("Farm Details have been registered successfully")
            }
            if(!response.ok){
                setError("An error occured, please try again later.")
            }
        }
    }

  return (
    <div>
        <Navbar />
        {error && <ErrorAlert error={error} setError={setError} />}
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
        <div className="container-fluid dashboard-content pb-5">
            <h1 className='text-[25px] mb-2 border-b'>New Farm Registeration</h1>
            <div>
                <h1 className='text-xl font-[700] mt-5'>Farm Details</h1>
                <div className="flex items-center justify-between gap-5">
                    <div className='mt-3 w-full'>
                        <label className='block'>Farm Name</label>
                        <input onChange={e => setFarmName(e.target.value)} type="text" placeholder='Rice Farm' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                    <div className='mt-3 w-full'>
                        <label className='block'>Crop</label>
                        <input onChange={e => setCrop(e.target.value)} type="text" placeholder='Rice' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <div className='mt-4 w-full'>
                        <label className='block'>Farm Size</label>
                        <input onChange={e => setFarmSize(e.target.value)} type="text" placeholder='5 Sq. Meters' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                    <div className='mt-4 w-full'>
                        <label className='block'>State Located</label>
                        <input onChange={e => setState(e.target.value)} type="text" placeholder='Lagos' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-5'>
                    <div className='mt-4 w-full'>
                        <label className='block'>Latitude</label>
                        <input onChange={e => setLat(e.target.value)} type="text" placeholder='6.35931' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                    <div className='mt-4 w-full'>
                        <label className='block'>Longitude</label>
                        <input onChange={e => setLong(e.target.value)} type="text" placeholder='4.1186091' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                </div>
            </div>
            <div className=''>
                <h1 className='text-xl font-[700] mt-5'>Contact Details</h1>
                <div className='flex items-center justify-between gap-5'>
                    <div className='mt-2 w-full'>
                        <label className='block'>Contact Name</label>
                        <input onChange={e => setFullName(e.target.value)} type="text" placeholder='John Doe' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                    <div className='mt-2 w-full'>
                        <label className='block'>Phone Number</label>
                        <input onChange={e => setPhoneNum(e.target.value)} type="text" placeholder='080123456789' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                    </div>
                </div>
            </div>
            {loading ? <button className="bg-[#1AC888] w-full my-3 py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> : <button className='text-center w-full my-3 py-2 bg-[#1AC888] text-white rounded-md' onClick={postFarmDetails}>Submit</button>}
        </div>
    </div>
  )
}

export default FarmLocation

// farm_size, state, lat and long, crop

// contact name, farm name, phone number