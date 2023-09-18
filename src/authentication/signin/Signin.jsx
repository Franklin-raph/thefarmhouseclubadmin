import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../assets/images/thefarmhouseclublogo2.png.crdownload.png"

const Signin = () => {
    const [loading, setLoading] = useState(false)
    const [adminLevel, setAdminLevel] = useState(1)
    const [adminEmail, setAdminEmail] = useState("")
    const [adminPhoneNum, setAdminPhoneNum] = useState("")
    const [adminPassWord, setAdminPassword] = useState("")
    const [inputType, setInputType] = useState("password");
    const [showPassword, setShowPassword] = useState(false)

    async function handleAdminRegister(){

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
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="email" class="form-control form-control-user"
                                                    id="exampleInputEmail" aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..." />
                                            </div>
                                            <div class="form-group flex items-center justify-between rounded-full pr-3" style={{ border:"1px solid #d1d3e2" }}>
                                                <input type={inputType} class="border-none form-control form-control-user"
                                                    id="exampleInputPassword" placeholder="Password" />
                                                    {!showPassword ? (
                                                    <i className="fa-regular fa-eye cursor-pointer" onClick={toggleInput}></i>
                                                    ) : (
                                                    <i className="fa-regular fa-eye-slash cursor-pointer" onClick={toggleInput}></i>
                                                    )}
                                            </div>
                                            <Link to="/dashboard" class="btn btn-primary btn-user btn-block">
                                                Login
                                            </Link>
                                        </form>
                                        <div class="text-center">
                                            <a class="small" href="forgot-password.html">Forgot Password?</a>
                                        </div>
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
    </div>
  )
}

export default Signin