import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
import loder from './loader.gif'
import { BASE_URL } from './AuthContext'
import { toast, ToastContainer } from 'react-toastify'
function AddExpence() {
    const [loading, setLoading] = useState(false)
    const [expenseDetails, setExpenseDetails] = useState({
        name: '',
        expenseOn: '',
        date: '',
        amount: 0,
        email: JSON.parse(localStorage.getItem('login')).user,
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
        company: {
            companyId: 0
        }
    })
    const handleEventChnage = (e) => {
        setExpenseDetails({
            ...expenseDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleOnSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/expense/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                },
                body: JSON.stringify(expenseDetails)
            });

            if (!response.ok) {
                throw new Error('Failed to add Expense item');
            }

            toast.success("Expense Added")


            const result = await response.json();
            // Handle response data if needed
        } catch (error){
            toast.error("Some error occurs")
        }
        setLoading(false)
    };

    return (
        <div className=''> <div className='m-3'><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 sm:w-10 w-44 sm:hidden flex">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>

            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add Expence</h1></div>
            <div className='gridstyle grid grid-cols-1 sm:grid-cols-4'>
                <div className='border border-gray-100 hidden sm:flex flex-col'>
                    <LeftSidbar openexpence="bold" />
                    <RightSidebar />
                </div>

                <div className='border border-gray-100 justify-center col-span-3'>
                    <form className="space-y-6 px-4 lg:px-40 py-2 sm:mx-28 m-3" onSubmit={(e) => handleOnSubmit(e)}>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Spent By
                            </label>
                            <input id="name" name="name" value={expenseDetails.name} type="text" onChange={(e) => handleEventChnage(e)} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Spent On
                            </label>
                            <input id="expenseOn" value={expenseDetails.expenseOn} onChange={(e) => handleEventChnage(e)} name="expenseOn" type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                            </div>
                            <div className="mt-2">
                                <input id="date" name="date" onChange={(e) => handleEventChnage(e)} type="date" value={expenseDetails.date} className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="ammount" className="block text-sm font-medium leading-6 text-gray-900">SpentAmmount</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="amount" onChange={(e) => handleEventChnage(e)} type="number" min='0' value={expenseDetails.amount} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className='flex justify-center mt-6'>
                            <button type="submit" className="flex w-[10rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <div><img className='w-6 rounded-full' src={loder} alt="" /></div> : "Add Expence"}</button>
                        </div>
                        <div className='w-full text-center text-green-700 font-bold text-sm ' id='info'></div>
                    </form>

                </div>

            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddExpence
