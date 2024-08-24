import React, { useState } from 'react'
import axios from 'axios'
import loder from './loader.gif'
import { BASE_URL } from './AuthContext'
function Contact() {
    const [loading, setLoading] = useState(false)
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        message: ''
    })
    const handleOnChange = (e) => {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        })

    }
    const sendMail = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const contactResponse = await axios.post(`${BASE_URL}/auth/contact`, contactInfo)
            document.getElementById('submitInfo').innerHTML = contactResponse.data
            document.getElementById('submitInfo').classList.remove("text-red-600")
            document.getElementById('submitInfo').classList.add("text-green-600")
            setTimeout(()=>{
                document.getElementById('submitInfo').innerHTML = ""
            },3000)
        } catch (e) {
            document.getElementById('submitInfo').innerHTML = "Please enter a valid gmail"
            document.getElementById('submitInfo').classList.remove("text-green-600")
            document.getElementById('submitInfo').classList.add("text-red-600")
            setTimeout(()=>{
                document.getElementById('submitInfo').innerHTML = ""
            },3000)
        }
        setLoading(false)
    }

    return (
        <div>
            <div className='h-[1rem] w-fill flex justify-center'>{loading ? <img className='h-12' src={loder} alt="" /> : ''}</div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-20 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Ask your querry here we will reply you As soon as possible</p>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                    <input type="text" value={contactInfo.name} onChange={(e) => handleOnChange(e)} id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                    <input type="email" value={contactInfo.email} onChange={(e) => handleOnChange(e)} id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                    <textarea id="message" value={contactInfo.message} onChange={(e) => handleOnChange(e)} name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={(e) => sendMail(e)} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                            </div>
                            <div id="submitInfo" className='w-full text-center text-xl font-bold text-green-600 m-4 '></div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Contact
