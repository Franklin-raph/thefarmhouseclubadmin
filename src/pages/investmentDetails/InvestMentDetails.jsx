import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import SuccessAlert from '../../components/alert/SuccessAlert'
import ErrorAlert from '../../components/alert/ErrorAlert'

const InvestMentDetails = ({baseUrl}) => {
    const {id} = useParams()
    const projectTypes = ["Processing","Production","Logistics","Trading"]
    const [projectTypeDropDown, setProjectTypeDropDown] = useState(false)
    const [project_name, setProjectName] = useState("")
    const [apy, setApy] = useState("")
    const [close, setClose] = useState("")
    const [description, setDescription] = useState("")
    const [maturity_date, setMaturityDate] = useState("")
    const [profit_yield, setProfitYield] = useState("")
    const [project_type, setProjectType] = useState("")
    const [tvl, setTvl] = useState("")
    const [tvr, setTvr] = useState("")
    const [unit_price, setUnitPrice] = useState("")
    const [vesting_period, setVestingPeriod] = useState("")
    const[deleteProject, setDeleteProject] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    // const [project_name, setProjectName] = useState("")

    useEffect(() => {
        getInvestMentDetails()
    },[])

    async function getInvestMentDetails () {
        const response = await fetch(`${baseUrl}/investments/${id}`,{
            headers:{
                Authorization:`Bearer ${admin.access}`
            }
        })
        const data = await response.json()
        if(response.ok){
            setProjectName(data.project_name)
            setApy(data.apy)
            setClose(data.close)
            setDescription(data.description)
            setMaturityDate(data.maturity_date)
            setProfitYield(data.profit_yield)
            setProjectType(data.project_type)
            setTvl(data.tvl)
            setTvr(data.tvr)
            setUnitPrice(data.unit_price)
            setVestingPeriod(data.vesting_period)
        }
        console.log(data)
    }

    async function handleProjectDelete(){
        setLoading(true)
        const response = await fetch(`${baseUrl}/investments/${id}`,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${admin.access}`
            }
        })
        if(response) setLoading(false)
        if(response.ok){
            navigate("/dashboard")
        }
        const data = await response.json()
        console.log(response, data)
    }

    async function handleProjectUpdate(){
        setLoading(true)
        console.log(JSON.stringify({project_name:project_name, project_type:project_type, tvl:0, tvr:tvr, 
            profit_yield:0, unit_price:unit_price, apy:apy, maturity_date:maturity_date, 
            vesting_period:vesting_period, close:close, description:description}))
        const response = await fetch(`${baseUrl}/investments/${id}`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${admin.access}`,
                "Content-Type":"application/json"
            },
            body:JSON.stringify({project_name:project_name, project_type:project_type, tvl:0, tvr:tvr, 
                profit_yield:0, unit_price:unit_price, apy:apy, maturity_date:maturity_date, 
                vesting_period:vesting_period, close:close, description:description}),
        })
        if(response) setLoading(false)
        if(response.ok){
            navigate("/dashboard")
            setSuccess("Project has been successfully updated")
        }
        if(!response.ok){
            setError("An error occured please try again")
        }
        const data = await response.json()
        console.log(response, data)
    }

  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-2 border-b'>Investment Details</h1>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Project Name</label>
                    <input type="text" placeholder='Cocoa Processing Farm' value={project_name} onChange={e => setProjectName(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 relative w-full'>
                    <label className='block'>Project Type</label>
                    <div style={{ border:"1px solid #bebebe" }} className='py-2 px-1 rounded-md w-full flex items-center justify-between'>
                        <input type="text" placeholder='Processing' value={project_type} onChange={e => setProjectType(e.target.value)} className="outline-none" />
                        <i class="ri-arrow-down-s-line cursor-pointer" onClick={() => setProjectTypeDropDown(!projectTypeDropDown)}></i>
                    </div>
                    {projectTypeDropDown &&
                    <div className="absolute bg-slate-200 mt-1 rounded-md py-1 px-2 w-[100%]">
                        {projectTypes.map(projectType => (
                            <p className='cursor-pointer my-1'>{projectType}</p>
                        ))}
                    </div>
                    }
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Total Value Required</label>
                    <input type="text" placeholder='0' value={tvr} onChange={e => setTvr(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Total Value Locked</label>
                    <input type="text" placeholder='0' value={tvl} onChange={e => setTvl(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Profit Yield</label>
                    <input type="text" placeholder='0' value={profit_yield} onChange={e => setProfitYield(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Unit Price</label>
                    <input type="text" placeholder='0' value={unit_price} onChange={e => setUnitPrice(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Liquidity Pool</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>APY</label>
                    <input type="text" placeholder='0' value={apy} onChange={e => setApy(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Voting Fee</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Proposal Fee</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Vesting Period</label>
                    <input type="date" placeholder='0' value={vesting_period} onChange={e => setVestingPeriod(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Maturity Date</label>
                    <input type="date" placeholder='0' value={maturity_date} onChange={e => setMaturityDate(e.target.value)} style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Project Image</label>
                    <input type="file" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Project File</label>
                    <input type="file" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='mt-4 w-full flex items-center justify-start gap-1'>
                <input type="checkbox" checked={close} onChange={e => setClose(e.target.value)} />
                <p>Closed?</p>
            </div>
            <div className='mt-4'>
                <label className='block'>Project Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ border:"1px solid #bebebe" }} placeholder='Enter a project description' className='outline-none py-2 px-1 rounded-md w-full' cols="30" rows="10"></textarea>
            </div>
            <div className="flex justify-between-items-center gap-3">
                {loading ? 
                    <button className='text-center w-full my-3 py-2 bg-[#1AC888] text-white rounded-md'><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button>
                    :
                    <button className='text-center w-full my-3 py-2 bg-[#1AC888] text-white rounded-md' onClick={handleProjectUpdate} >Update Investment</button> 
                }
                    <button className='text-center w-full my-3 py-2 bg-red-500 text-white rounded-md' onClick={() => setDeleteProject(true)}>Delete Project</button>
            </div>
        </div>
        {deleteProject && 
            <div className="confirmDeleteModal">
                <div className="deleteModal">
                    <p>Are you sure you want to delete this project?</p>
                    <div>
                        {loading ? <button className="bg-red-500 px-2 py-1 mr-3 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> : <button className='text-center my-3 px-2 py-1 mr-3 bg-red-500 text-white rounded-md' onClick={handleProjectDelete}>Yes</button>}
                        <button className='text-center my-3 px-2 py-1 mr-3 bg-gray-600 text-white rounded-md'  onClick={() => setDeleteProject(false)}>No</button>
                    </div>
                </div>
            </div>
        }
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
        {error && <ErrorAlert error={error} setError={setError}/>}
    </div>
  )
}

export default InvestMentDetails