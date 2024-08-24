import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
import loder from './loader.gif'
import { BASE_URL } from './AuthContext'
import { toast, ToastContainer } from 'react-toastify'
function AddCustomer() {
    const [uploadStatus, setUplaodStatus] = useState("")
    const [loading,setLoading]=useState(false)
    const [cusomerDetails, setCustomerDetails] = useState({
        customerName: '',
        address: '',
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
        state: '',
        country: '',
        pinCode: '',
        gstIn: '',
        gstType: '',
        mobile: '',
        email:JSON.parse(localStorage.getItem('login')).user,
        company: {
            companyId: 0
        }

    })
    const handleOnChange = (e) => {
        setCustomerDetails({
            ...cusomerDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleRadioButton = (e) => {
        setCustomerDetails({
            ...cusomerDetails,
            gstType: e.target.value
        })
    }
    const handleOnSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/customer/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                },
                body: JSON.stringify(cusomerDetails)
            });

            if (response.ok) {
                toast("Customer added")
                setCustomerDetails({
                    customerName: '',
                    address: '',
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                    state: '',
                    country: '',
                    pinCode: '',
                    gstIn: '',
                    gstType: '',
                    mobile: '',
                    email:JSON.parse(localStorage.getItem('login')).user,
                    company: {
                        companyId: 0
                    }
                })
                setTimeout(() => {
                    setUplaodStatus("");
                }, 2000);

            } else {
                
               toast.error("Something went wrong")
             
            }
        } catch (error) {
           toast.error("Server not responding")
            
        }
        setLoading(false)
    };

    return (
        <div className='my-6 sm:h-[32.7rem] '>
            <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>

            <div className=' grid grid-cols-1 sm:grid-cols-4'>

                <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddcustomer="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-gray-100 justify-center col-span-3 w-full '>
                    <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New Customer</h1></div>
                    <form className="space-y-6 m-2 py-2 sm:pl-48" >
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName1" className="block text-sm font-medium leading-6 text-gray-900">Enter Customer's name</label>
                                    <input id="customerName" name="customerName" onChange={(e) => handleOnChange(e)} type="text" value={cusomerDetails.customerName} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName2" className="block text-sm font-medium leading-6 text-gray-900">Enter Customer's Address</label>
                                    <input id="address" name="address" type="text" onChange={(e) => handleOnChange(e)} value={cusomerDetails.address} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName3" className="block text-sm font-medium leading-6 text-gray-900">State</label>
                                    <input id="state" name="state" type="text" onChange={(e) => handleOnChange(e)} value={cusomerDetails.state} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName4" className="block text-sm font-medium leading-6 text-gray-900">Country</label>
                                    <input id="country" name="country" type="text" onChange={(e) => handleOnChange(e)} value={cusomerDetails.country} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName3" className="block text-sm font-medium leading-6 text-gray-900">GST In(Optional)</label>
                                    <input id="gstIn" name="gstIn" type="text" onChange={(e) => handleOnChange(e)} value={cusomerDetails.gstIn} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label className="block">
                                        <input type="radio" onChange={(e) => handleRadioButton(e)} name="option" value="Regular" className="mr-1" />
                                        Regular(Optional)
                                    </label>
                                    <label className="block">
                                        <input type="radio" onChange={(e) => handleRadioButton(e)} name="option" value="Composition" className="mr-1" />
                                        Composition(Optional)
                                    </label>
                                </div>
                            </div>
                            <div className='flex flex-wrap'>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName3" className="block text-sm font-medium leading-6 text-gray-900">Mobile</label>
                                    <input
                                        id="mobile"
                                        name="mobile"
                                        type="tel"
                                        pattern="[0-9]{10}"  // Set the pattern attribute to allow only 10 digits
                                        maxLength="10"       // Set the maxLength attribute to limit input to 10 characters
                                        value={cusomerDetails.mobile
                                        }
                                        onChange={(e) => handleOnChange(e)}
                                        className="mt-1 p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black"
                                        placeholder="Enter 10-digit mobile number"  // Add a placeholder for user guidance
                                        required  // Add the required attribute to make the input field mandatory
                                    />    </div>
                                <div className='w-full sm:w-1/2 m-1'>
                                    <label htmlFor="itemName4" className="block text-sm font-medium leading-6 text-gray-900">Pin Code</label>
                                    <input id="pincode" name="pinCode" type="number" onChange={(e) => handleOnChange(e)} value={cusomerDetails.pinCode} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>

                    </form>

                    <div className='flex justify-center mt-6'>
                        <button type="submit" onClick={(e) => handleOnSubmit(e)} className="w-[10rem] flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading?<img className='h-6 rounded-full' src={loder} alt="" />:"Add Customer"}</button>
                    </div>
                    <div id='info' className='w-full text-center text-xl font-bold text-green-800 mt-2'>{uploadStatus}</div>

                </div>

            </div><ToastContainer/>
        </div>
    )
}

export default AddCustomer
