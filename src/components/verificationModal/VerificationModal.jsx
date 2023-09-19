import {useState} from 'react'
import ErrorAlert from '../alert/ErrorAlert'
import { useNavigate } from 'react-router-dom'

const VerificationModal = ({adminEmail, adminPassword, baseUrl}) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [token, setToken] = useState("")
    const [error, setError] = useState("")

    async function handleAdminLogin(){
        console.log({email:adminEmail, password:adminPassword, token:token})
        if(!token){
            setError("Please fill in the field")
            return
        }else{
            setLoader(true)
            const response = await fetch(`${baseUrl}/admin-login/`,{
                method:"POST",
                body:JSON.stringify({email:adminEmail, password:adminPassword, token:token}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            if(response) setLoader(false)
            if(!response.ok){
                setError(data.detail)
            }
            if(response.ok){
                localStorage.setItem("admin", JSON.stringify(data))
                navigate("/dashboard")
            }
        }
    }

  return (
    <div class="otp-input-field-bg">
        <div className="otp-input">
            <i class="ri-shield-check-fill text-[#fff] bg-[#1AC888] p-3 rounded-full text-4xl"></i>
            <h1 className='mt-5 text-lg'>Enter the 8 digit OTP Code sent to your mail at {adminEmail} </h1>
            <input type="number" onChange={e => setToken(e.target.value)} className='outline-none w-full px-3 py-1 my-3 rounded-md' style={{ border:"1px solid gray" }} placeholder='********'/>
            {
            loader ? <button className="bg-[#1AC888] w-full py-2 rounded-[6px] text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
            : 
            <button className='text-[#fff] bg-[#1AC888] w-full py-1 px-5 rounded-md' onClick={handleAdminLogin}>Verify OTP</button>
            }
        </div>
        {error && <ErrorAlert error={error} setError={setError}/>}
    </div>
  )
}

export default VerificationModal