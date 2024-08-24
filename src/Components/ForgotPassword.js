import React, { useState } from 'react'
import Carasoul from './Carasoul'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import loder from './loader.gif'
import { BASE_URL } from './AuthContext'


function ForgotPassword() {
    const [signupStatus, setSignupStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [sendOtp, setSendOtp] = useState(false)
    const [otpStatus, setOtpStatus] = useState("")
    const [newPasswordDetails, setNewPasswordDetails] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    })
    const handleOnChange = (e) => {
        setNewPasswordDetails({
            ...newPasswordDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (sendOtp) {
            setLoading(true)
            try {
                console.log(newPasswordDetails)
                const response = await axios.post(`${BASE_URL}/auth/updatepassword`, newPasswordDetails);
                setLoading(false)
                setOtpStatus(response.data)
                setTimeout(() => {
                    setOtpStatus('')
                }, 3000)
            } catch (e) {
                setLoading(false)
                setOtpStatus("! Server Problem try again after some time")
                setTimeout(() => {
                    setOtpStatus('')
                }, 3000)
            }
        } else {
            setLoading(true)

            try {
                const response = await axios.post(`${BASE_URL}/auth/otp/${newPasswordDetails.email}`, {});
                setLoading(false)
                setOtpStatus(response.data)

                if (response.data !== "Your Email is not registered Please Signup") {
                    setSendOtp(true)
                    document.getElementById('otpInfo').classList.remove('text-red-600')
                    document.getElementById('otpInfo').classList.add('text-green-600')
                } else {
                    setTimeout(() => {
                        setOtpStatus('')
                    }, 3000)
                    document.getElementById('otpInfo').classList.remove('text-green-600')
                    document.getElementById('otpInfo').classList.add('text-red-600')
                }
            } catch (e) {
                setOtpStatus("! Server problem try again later ")
                setTimeout(() => {
                    setOtpStatus('')
                }, 3000)
                setLoading(false)
                document.getElementById('otpInfo').classList.remove('text-green-600')
                document.getElementById('otpInfo').classList.add('text-red-600')
            }
        }

    }
    return (
        <div>
            <div className='m-5 sm:h-full h-[40.5rem] flex justify-center'>

                {signupStatus ? <div className="fixed top-0 left-0  w-full h-full bg-black opacity-50 z-50"></div> : ''}
                {
                    signupStatus ? <div className=' w-[22rem] sm:w-[30rem] sm:p-10 flex justify-center absolute'>
                        <div className=' bg-white w-[40rem]  h-[20rem] text-center p-2 rounded-lg flex flex-col items-center justify-center z-50'>
                            <div className='text-xl text-green-600 font-bold p-1'>Congratulation ! You are registered successfully</div>
                            <div className="message rounded-xl m-5">
                                <div className='text-red-600 bg-red-100 p-1'>! important We Have sent an Verification email Please Verify your email</div>
                                <div className='text-red-600 bg-red-100 p-1'>Got to your mail and Verify your Account</div>
                            </div>
                            <NavLink className=" border border-blue-600 p-2 rounded-lg text-white font-semibold bg-blue-600 m-10" to="/">Click here to Sign-in</NavLink>
                        </div>
                    </div> : ''
                }
                <div className="container flex justify-center  flex-col">
                    <div className='text-3xl flex justify-center mt-4'>
                        Welcome to <span className='text-semibold'>Trade</span><span className='text-red-400 font-bold'>Mate</span>
                    </div>
                    <div className='grid sm:grid-cols-2 grid-cols-1  ml-10'>
                        <div className="col1 justify-between flex-wrap mt-8 hidden sm:flex">
                            <Carasoul />
                        </div>
                        <div className="col2 pr-20 pt-15">
                            <div id='otpInfo' className='w-full h-14 mt-3 flex justify-center text-green-600 font-bold'>{otpStatus === "Otp Has been Sent" ? `✅${otpStatus}` : otpStatus}{loading ? <div><img src={loder} alt="" /></div> : ''}</div>
                            <div className="signintag flex flex-col items-center pb-4  "> <span className='text-3xl '>Password Recovery</span></div>

                            <div>
                                <form className="space-y-6" onSubmit={(e) => handleOnSubmit(e)}>
                                    <div>

                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-900">Enter your registered email to get otp</label>
                                        <div className="mt-2">
                                            <input id="email" disabled={sendOtp ? true : false} onChange={(e) => handleOnChange(e)} name="email" value={newPasswordDetails.email} type="email" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    {
                                        sendOtp ? <div>  <div>
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-blue-900">Enter otp (we have sent on your mail)</label>
                                            <div className="mt-2">
                                                <input id="name" name="otp" type="text" onChange={(e) => handleOnChange(e)} value={newPasswordDetails.otp} required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">new Password</label>

                                                </div>
                                                <div className="mt-2">
                                                    <input id="password" name="newPassword" value={newPasswordDetails.newPassword} onChange={(e) => handleOnChange(e)} type="password" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <label htmlFor="confirm password" className="block text-sm font-medium leading-6 text-blue-900">Confirm new Password</label>

                                                </div>
                                                <div className="mt-2">
                                                    <input id="confirm-password" name="confirmPassword" value={newPasswordDetails.confirmPassword} onChange={(e) => handleOnChange(e)} type="password" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div></div> : ''
                                    }
                                    {/* <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-blue-900">Role</label>

                                </div>
                                <div className="mt-2">
                                    <input id="role" name="role" type="text" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div> */}

                                    <div>
                                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{sendOtp?"Create New Password":"Generate Otp"}</button>
                                    </div>
                                    <div id="errorMsg" className='text-red-600 w-full text-center'></div>
                                    <div className="text-sm flex justify-end">
                                        <p className='mx-2'>Back to  </p><a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">Sign in</a>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
