import React from 'react'
import emailjs from "@emailjs/browser";
import { NavLink } from 'react-router-dom';
import { BASE_URL } from './AuthContext';
function VerificationAlert() {
    const emailContent = {
        message: `${BASE_URL}/auth/setverify/${JSON.parse(localStorage.getItem('login')).user}`,
        email: JSON.parse(localStorage.getItem('login')).user,
     
    }
    const sendMail = (e) => {
        e.preventDefault();

        emailjs
            .send(
                'service_nssug1z',
                'template_cs2zpq4',
                emailContent,
                'gRnAhI6GS0Gzlw9Ec'
            )
            .then((result) => {
             document.getElementById('info').innerHTML="Verification Email sent successfully!"
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    };
    return (
        <div className=' w-full flex flex-col  items-center justify-center h-[35.6rem]'>
            <div className='text-red font-bold text-3xl text-red-500 bg-red-200  w-80 h-40 p-6 rounded-lg'>! Please Verify your Email Then login Again</div>
            <div className="text-red-500">Go to Your mail and Verify your email Account</div>
            <div>
            <button onClick={sendMail} className='border border-green-400 p-2 rounded-md my-10 bg-blue-800 hover:bg-blue-400 text-white hover:text-black'>Resend Mail</button>
            <NavLink to="/" className='border border-green-400 p-2 rounded-md my-10 bg-blue-800 hover:bg-blue-400 text-white hover:text-black ml-1'>Signin</NavLink>
            </div>
            <div id="info" className='text-green-500 font-semibold text-sm'></div>
        </div>
    )
}

export default VerificationAlert
