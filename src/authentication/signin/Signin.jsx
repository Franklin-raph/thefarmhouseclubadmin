import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"
import VerificationModal from '../../components/verificationModal/VerificationModal'
import ErrorAlert from '../../components/alert/ErrorAlert'

const Signin = ({baseUrl}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPassWord, setAdminPassword] = useState("")
    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const admin = JSON.parse(localStorage.getItem("admin"))

    useEffect(() => {
        if(admin) navigate("/dashboard")
    },[])

    async function handleAdminSignIn(e){
        e.preventDefault()
        if(!adminEmail || !adminPassWord){
            setError("Please fill in the fields")
        }else{
            setLoading(true)
            const response = await fetch(`${baseUrl}/login/`, {
                method:"POST",
                body: JSON.stringify({email:adminEmail, password:adminPassWord}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            if(response) setLoading(false)
            console.log(response)
            console.log(data)
            if(response.ok){
                setSuccess(true)
            }

            if(!response.ok){
                setError(data.detail)
            }
        }
        
    }

    const toggleInput = () => {
        setInputType(inputType === "password" ? "text" : "password");
        setShowPassword(!showPassword);
      };

  return (
    <div class="bg-gradient-primary" style={{ height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-10 col-lg-12 col-md-9">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div class="col-lg-6">
                                    <div class="p-5">
                                        <div class="text-center">
                                            <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form class="user" onSubmit={handleAdminSignIn}>
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." onChange={e => setAdminEmail(e.target.value)}/>
                                            </div>
                                            <div class="form-group flex items-center justify-between rounded-full pr-3" style={{ border:"1px solid #d1d3e2" }}>
                                                <input type={inputType} class="border-none form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" onChange={e => setAdminPassword(e.target.value)}/>
                                                    {!showPassword ? (
                                                    <i className="fa-regular fa-eye cursor-pointer" onClick={toggleInput}></i>
                                                    ) : (
                                                    <i className="fa-regular fa-eye-slash cursor-pointer" onClick={toggleInput}></i>
                                                    )}
                                            </div>
                                            {
                                            loading ? <button className="bg-[#1AC888] w-full py-2 rounded-full text-lg text-center"><i className="fa-solid fa-gear fa-spin" style={{ color:"#fff" }}></i></button> 
                                            : 
                                            <button type='submit' class="btn btn-primary btn-user btn-block bg-[#1AC888]"> Login </button>
                                            }
                                        </form>
                                        {/* <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div> */}
                                        {/* <div class="text-center">
                                          <Link class="small" to="/signup">Create an Account!</Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {success && <VerificationModal adminPassword={adminPassWord} adminEmail={adminEmail} error={error} baseUrl={baseUrl} success={success} setSuccess={setSuccess} setError={setError}/>}
        {error && <ErrorAlert error={error} setError={setError}/>}
    </div>
  )
}

export default Signin