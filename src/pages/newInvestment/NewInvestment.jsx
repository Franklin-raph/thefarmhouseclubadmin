import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import ErrorAlert from '../../components/alert/ErrorAlert'
import SuccessAlert from '../../components/alert/SuccessAlert'

const NewInvestment = ({baseUrl}) => {
    const projectTypes = ["Processing","Production","Logistics","Trading"]
    const [projectTypeDropDown, setProjectTypeDropDown] = useState(false)
    const [project_name, setProjectName] = useState("")
    const [project_type, setProjectType] = useState("")
    const [tvl, setTvl] = useState("")
    const [tvr, setTvr] = useState("")
    const [profit_yield, setProfitYield] = useState("")
    const [unit_price, setUnitPrice] = useState("")
    const [apy, setApy] = useState("")
    // const [voting_fee, setVotingFee] = useState("")
    // const [proposal_fee, setProposalFee] = useState("")
    const [maturity_date, setMaturityDate] = useState("")
    const [vesting_period, setVestingPeriod] = useState("")
    const [close, setClose] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(false)
    const admin = JSON.parse(localStorage.getItem("admin"))

    async function postAnInvestment(){
        if(!project_name || !project_type || !tvl || !tvr || !profit_yield || !unit_price || !apy || !maturity_date || !vesting_period || !description){
            setError("Please fill in all fields")
        }else{
            setLoading(true)
            const response = await fetch(`${baseUrl}/investments/`,{
                method:"POST",
                body:JSON.stringify({project_name:project_name, project_type:project_type, tvl:tvl, tvr:tvr, 
                    profit_yield:profit_yield, unit_price:unit_price, apy:apy, maturity_date:maturity_date, 
                    vesting_period:vesting_period, close:close, description:description}),
                headers:{
                    Authorization:`Bearer ${admin.access}`,
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            console.log(response,data)

            if(response) setLoading(false)

            if(response.ok){
                setSuccess("Project successfully added")
            }

            if(!response.ok){
                setError("An error occured")
            }
        }
    }

  return (
    <div>
        <Navbar />
        {error && <ErrorAlert error={error} setError={setError} />}
        {success && <SuccessAlert success={success} setSuccess={setSuccess}/>}
        <div className="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-2 border-b'>New Project</h1>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Project Name</label>
                    <input onChange={e => setProjectName(e.target.value)} type="text" placeholder='Cocoa Processing Farm' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 relative w-full'>
                    <label className='block'>Project Type</label>
                    <div style={{ border:"1px solid #bebebe" }} className='py-2 px-1 rounded-md w-full flex items-center justify-between'>
                        <input type="text" placeholder='Processing' onChange={e => setProjectType(e.target.value)} className="outline-none" />
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
                    <input onChange={e => setTvr(e.target.value)} type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Total Value Locked</label>
                    <input onChange={e => setTvl(e.target.value)} type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Profit Yield</label>
                    <input onChange={e => setProfitYield(e.target.value)} type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Unit Price</label>
                    <input onChange={e => setUnitPrice(e.target.value)} type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Liquidity Pool</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>APY</label>
                    <input type="text" onChange={e => setApy(e.target.value)} placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
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
                    <input type="date" onChange={e => setVestingPeriod(e.target.value)} placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Maturity Date</label>
                    <input type="date" onChange={e => setMaturityDate(e.target.value)} placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
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
                <input onChange={e => setClose(e.target.value)} type="checkbox" />
                <p>Closed?</p>
            </div>
            <div className='mt-4'>
                <label className='block'>Project Description</label>
                <textarea onChange={e => setDescription(e.target.value)} style={{ border:"1px solid #bebebe" }} placeholder='Enter a project description' className='outline-none py-2 px-1 rounded-md w-full' cols="30" rows="10"></textarea>
            </div>
            {loading ? <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> : <button className='text-center w-full my-3 py-2 bg-[#1AC888] text-white rounded-md' onClick={postAnInvestment}>Create Investment</button>}
            
        </div>
    </div>
  )
}

export default NewInvestment