import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useParams } from 'react-router-dom'

const UserDetails = ({baseUrl}) => {
    const {id} = useParams()

    useEffect(() => {
        getUserDetails()
    },[])

    async function getUserDetails () {
        const response = await fetch(`${baseUrl}/profile-update/${id}`,{
            headers:{
                Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTM5MzY4LCJpYXQiOjE2OTUwNTI5NjgsImp0aSI6IjE5ZWEwNjMyMjljOTQ4MzhiYTEyZDhmNzA2YzA1OTc3IiwidXNlcl9pZCI6IjVmNzUyNTFhLTg1ZjgtNDAzNy04NGU0LWY5MGI3ZGJlOWM4ZiJ9.F8NbrZCH2MZj0iIgEKgrEl7XLwd7f4JElApF1kS3hdE`
            }
        })
        const data = await response.json()
        console.log(data)
    }
    
  return (
    <div>
        <Navbar />
        <div class="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-3'>User Details</h1>
        </div>
    </div>
  )
}

export default UserDetails