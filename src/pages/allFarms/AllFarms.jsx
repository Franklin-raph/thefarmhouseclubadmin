import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const AllFarms = ({baseUrl}) => {
    const [loading, setLoading] = useState(false)
    const [allFarms, setAllFarms] = useState([])
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [userQuerySearch, setUserQuerySearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        getAllFarms()
    },[])

    async function getAllFarms(){
        const response = await fetch(`${baseUrl}/farm-details/`, {
            method:"GET",
            headers:{
                Authorization: `Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        console.log(response, data)
        if(response.ok){
            setAllFarms(data)
        }
    }
  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content pb-5">
            <h1 className='text-[25px] border-b mb-5'>All Farms</h1>
            {allFarms && 
            <div class="container-fluid">
                {/* <h1 class="h3 mb-2 text-gray-800">Users</h1> */}
                <div class="card shadow mb-4">
                    <div class="card-header py-3 flex items-center justify-between">
                        <h6 class="m-0 font-weight-bold text-primary">Farms Table({allFarms && allFarms.length})</h6>
                        <div className="flex items-center px-2 py-1 rounded-sm" style={{ border:"1px solid #ccc" }}>
                            <input type="text" className='outline-none border-none' onChange={(e) => setUserQuerySearch(e.target.value.toLocaleLowerCase())} placeholder='Search for a farm'/>
                            <i class="fas fa-search fa-fw"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Farm Name</th>
                                        <th>Farm Size</th>
                                        <th>State</th>
                                        <th>Crop</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {allFarms && allFarms.filter(farm => farm.farm_name
                                .toLowerCase().includes(userQuerySearch) || farm.state
                                .toLowerCase().includes(userQuerySearch) || farm.farm_size
                                .toLowerCase().includes(userQuerySearch) || farm.crop
                                .toLowerCase().includes(userQuerySearch)
                                )
                                .map((farm, index) =>{
                                    return(
                                    <tr className='cursor-pointer hover:bg-slate-200' onClick={() => navigate(`/farmdetails/${farm.id}`)}>
                                        <td>{index + 1}</td>
                                        <td>{farm.farm_name}</td>
                                        <td>{farm.farm_size}</td>
                                        <td>{farm.state}</td>
                                        <td>{farm.crop}</td>
                                    </tr>
                                )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default AllFarms