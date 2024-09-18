import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Carasoul from './Carasoul';
import loder from './loader.gif';
import { BASE_URL } from './AuthContext';

function ForgotPassword() {
    const [signupStatus, setSignupStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sendOtp, setSendOtp] = useState(false);
    const [newPasswordDetails, setNewPasswordDetails] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleOnChange = (e) => {
        setNewPasswordDetails({
            ...newPasswordDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (sendOtp) {
            try {
                const response = await axios.post(`${BASE_URL}/auth/updatepassword`, newPasswordDetails);
                setLoading(false);
                toast.success('Password updated successfully!');
                setTimeout(() => {
                    setSendOtp(false);
                    setNewPasswordDetails({
                        email: '',
                        otp: '',
                        newPassword: '',
                        confirmPassword: ''
                    });
                }, 3000);
            } catch (error) {
                setLoading(false);
                toast.error('Server problem! Please try again later.');
            }
        } else {
            try {
                const response = await axios.post(`${BASE_URL}/auth/otp/${newPasswordDetails.email}`, {});
                setLoading(false);
                if (response.data !== "Your Email is not registered Please Signup") {
                    toast.success('OTP has been sent to your email.');
                    setSendOtp(true);
                } else {
                    toast.error('Your email is not registered. Please sign up.');
                }
            } catch (error) {
                setLoading(false);
                toast.error('Server problem! Please try again later.');
            }
        }
    };

    return (
        <div>
            <div className='m-5 sm:h-full h-[40.5rem] flex justify-center'>
                <ToastContainer />
                {signupStatus && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
                )}
                {signupStatus && (
                    <div className='w-[22rem] sm:w-[30rem] sm:p-10 flex justify-center absolute'>
                        <div className='bg-white w-[40rem] h-[20rem] text-center p-2 rounded-lg flex flex-col items-center justify-center z-50'>
                            <div className='text-xl text-green-600 font-bold p-1'>Congratulation! You are registered successfully</div>
                            <div className="message rounded-xl m-5">
                                <div className='text-red-600 bg-red-100 p-1'>! Important: We have sent a verification email. Please verify your email.</div>
                                <div className='text-red-600 bg-red-100 p-1'>Go to your mail and verify your account.</div>
                            </div>
                            <NavLink className="border border-blue-600 p-2 rounded-lg text-white font-semibold bg-blue-600 m-10" to="/">Click here to Sign-in</NavLink>
                        </div>
                    </div>
                )}
                <div className="container flex justify-center flex-col">
                    <div className='text-3xl flex justify-center mt-4'>
                        Welcome to <span className='text-semibold'>Trade</span><span className='text-red-400 font-bold'>Mate</span>
                    </div>
                    <div className='grid sm:grid-cols-2 grid-cols-1 ml-10'>
                        <div className="col1 justify-between flex-wrap mt-8 hidden sm:flex">
                            <Carasoul />
                        </div>
                        <div className="col2 pr-20 pt-15">
                            <div className='w-full h-14 mt-3 flex justify-center text-green-600 font-bold'>
                                {loading && <div><img src={loder} alt="Loading" /></div>}
                            </div>
                            <div className="signintag flex flex-col items-center pb-4">
                                <span className='text-3xl'>Password Recovery</span>
                            </div>
                            <div>
                                <form className="space-y-6" onSubmit={handleOnSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-900">
                                            Enter your registered email to get OTP
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                disabled={sendOtp}
                                                onChange={handleOnChange}
                                                name="email"
                                                value={newPasswordDetails.email}
                                                type="email"
                                                required
                                                className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    {sendOtp && (
                                        <>
                                            <div>
                                                <label htmlFor="otp" className="block text-sm font-medium leading-6 text-blue-900">
                                                    Enter OTP (we have sent it to your mail)
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="otp"
                                                        name="otp"
                                                        type="text"
                                                        onChange={handleOnChange}
                                                        value={newPasswordDetails.otp}
                                                        required
                                                        className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-blue-900">
                                                    New Password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="newPassword"
                                                        name="newPassword"
                                                        value={newPasswordDetails.newPassword}
                                                        onChange={handleOnChange}
                                                        type="password"
                                                        required
                                                        className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-blue-900">
                                                    Confirm New Password
                                                </label>
                                                <div className="mt-2">
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={newPasswordDetails.confirmPassword}
                                                        onChange={handleOnChange}
                                                        type="password"
                                                        required
                                                        className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {sendOtp ? "Create New Password" : "Generate OTP"}
                                        </button>
                                    </div>
                                    <div id="errorMsg" className='text-red-600 w-full text-center'></div>
                                    <div className="text-sm flex justify-end">
                                        <p className='mx-2'>Back to</p>
                                        <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">Sign in</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
