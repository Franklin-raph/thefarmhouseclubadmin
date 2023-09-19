import { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({baseUrl}) => {

    const [allUsers, setAllUsers] = useState()
    const [allInvestments, setAllInvestments] = useState()
    const [usersTab, setUsersTab] = useState(true)
    const [investMentsTab, setInvestMentsTab] = useState(false)
    // const [usersTab, setUsersTab] = useState(true)
    // const [usersTab, setUsersTab] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        getUsers()
        getInvestments()
        console.log(baseUrl)
    },[])

    async function getUsers(){
        const response = await fetch(`${baseUrl}/users/`,{
            headers:{
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTg4OTI1LCJpYXQiOjE2OTUxMDI1MjUsImp0aSI6IjM2MTA5Njc2YWM2ZjQwZmNhNmMyNDA5NDYyZmI0YjcyIiwidXNlcl9pZCI6IjVmNzUyNTFhLTg1ZjgtNDAzNy04NGU0LWY5MGI3ZGJlOWM4ZiJ9.vxAUTXuwnlg1kzcIC3NdDgNYLUcdZSBbJflXEO13AUU"
            }
        })
        const data = await response.json()
        if(response.ok){
            setAllUsers(data.reverse())
        }
        console.log(data)
    }

    async function getInvestments(){
        const response = await fetch(`${baseUrl}/investments/`,{
            headers:{
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTg4OTI1LCJpYXQiOjE2OTUxMDI1MjUsImp0aSI6IjM2MTA5Njc2YWM2ZjQwZmNhNmMyNDA5NDYyZmI0YjcyIiwidXNlcl9pZCI6IjVmNzUyNTFhLTg1ZjgtNDAzNy04NGU0LWY5MGI3ZGJlOWM4ZiJ9.vxAUTXuwnlg1kzcIC3NdDgNYLUcdZSBbJflXEO13AUU"
            }
        })
        const data = await response.json()
        if(response.ok){
            setAllInvestments(data)
        }
        console.log(data)
    }

  return (
    <div>
        <Navbar />
        <div class="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-3'>Dashboard</h1>
            <div class="row">
                <div class="col-xl-3 col-md-6 mb-4 cursor-pointer">
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Earnings (Monthly)</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4 cursor-pointer">
                    <div class="card border-left-success shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Earnings (Annual)</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4 cursor-pointer" onClick={() => {
                    setInvestMentsTab(true)
                    setUsersTab(false)
                }}>
                    <div class="card border-left-info shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Investments</div>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-auto">
                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{allInvestments && allInvestments.length}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4 cursor-pointer" onClick={() => {
                    setInvestMentsTab(false)
                    setUsersTab(true)
                }}>
                    <div class="card border-left-warning shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">Total Users</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{allUsers && allUsers.length}</div>
                                </div>
                                <div class="col-auto">
                                    <i class="ri-user-3-line text-gray-300 text-[30px]"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {usersTab && 
            <div class="container-fluid">
                <h1 class="h3 mb-2 text-gray-800">Users</h1>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Users Table({allUsers && allUsers.length})</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Date Registered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {allUsers && allUsers.map(user => (
                                    <tr className='cursor-pointer hover:bg-slate-200' onClick={() => navigate(`/userdetails/${user.id}`)}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.date_joined}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            }

            {investMentsTab && 
            <div class="container-fluid">
                <div className="flex items-center justify-between mb-1">
                    <h1 class="h3 mb-2 text-gray-800">All Investments</h1>
                    <div className="flex items-center bg-slate-300 px-2 rounded-full cursor-pointer" onClick={() => navigate("/newinvestment")}>
                        <i class="ri-add-circle-fill text-[26px]"></i>
                        <p>Add an investment</p>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Investments Table({allInvestments && allInvestments.length})</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Project Type</th>
                                        <th>TVR</th>
                                        <th>Date Posted</th>
                                        <th>Closed?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {allInvestments && allInvestments.map(investment => (
                                    <tr className='cursor-pointer hover:bg-slate-200' onClick={(e) => navigate(`/investmentdetails/${investment.id}`)}>
                                        <td>{investment.project_name}</td>
                                        <td>{investment.project_type}</td>
                                        <td>{investment.tvr}</td>
                                        <td>{new Date(investment.date_posted).toLocaleDateString()}</td>
                                        <td>{investment.close === false ? <p className='p-2 bg-green-500 rounded-full inline-block'></p> : <p className='p-2 bg-red-500 rounded-full inline-block'></p> }</td>
                                    </tr>
                                ))}
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

export default Dashboard