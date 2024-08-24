import React from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
import { BASE_URL } from './AuthContext'
function AddEmployee() {
    return (
        <div className='sm:h-[32.7rem]'>
            <div className='m-3 pl-28 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-gray-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-black text-white border border-gray-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New Employee</h1></div>
            <div className='gridstyle grid grid-cols-4'>

                <div className='border border-gray-100 justify-center'>
                    <LeftSidbar openemployee="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-gray-100 justify-center col-span-3'>
                    <form className="space-y-6 px-4 lg:px-40 py-2" action="/" method="POST">
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="date" className="block text-sm font-medium leading-6 text-gray-900">Date of Joining</label>
                            </div>
                            <div className="mt-2">
                                <input id="date" name="date" type="date" className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label for="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Enter New Employee name</label>
                            <input id="itemName" name="itemName" type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            <label for="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Employee Address</label>
                            <input id="itemName" name="itemName" type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="ammount" className="block text-sm font-medium leading-6 text-gray-900">Employee Aadhar No.</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="amount" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="ammount" className="block text-sm font-medium leading-6 text-gray-900">Promissed Salery in Rs.</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="amount" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className='flex justify-center mt-6'>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Employee</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default AddEmployee
