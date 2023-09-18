import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'

const NewInvestment = () => {
    const projectTypes = ["Processing","Production","Logistics","Trading"]
    const [projectTypeDropDown, setProjectTypeDropDown] = useState(false)

  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-2 border-b'>New Investment</h1>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Project Name</label>
                    <input type="text" placeholder='Cocoa Processing Farm' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 relative w-full'>
                    <label className='block'>Project Type</label>
                    <div style={{ border:"1px solid #bebebe" }} className='py-2 px-1 rounded-md w-full flex items-center justify-between'>
                        <input type="text" placeholder='Processing' className="outline-none" />
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
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Total Value Locked</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Profit Yield</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Unit Price</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
            </div>
            <div className='flex items-center justify-between gap-5'>
                <div className='mt-4 w-full'>
                    <label className='block'>Liquidity Pool</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>APY</label>
                    <input type="text" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
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
                    <input type="date" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
                </div>
                <div className='mt-4 w-full'>
                    <label className='block'>Maturity Date</label>
                    <input type="date" placeholder='0' style={{ border:"1px solid #bebebe" }} className='outline-none py-2 px-1 rounded-md w-full'/>
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
                <input type="checkbox" />
                <p>Closed?</p>
            </div>
            <div className='mt-4'>
                <label className='block'>Project Description</label>
                <textarea style={{ border:"1px solid #bebebe" }} placeholder='Enter a project description' className='outline-none py-2 px-1 rounded-md w-full' cols="30" rows="10"></textarea>
            </div>
            <button className='text-center w-full my-3 py-2 bg-[#1AC888] text-white rounded-md'>Create Investment</button>
        </div>
    </div>
  )
}

export default NewInvestment