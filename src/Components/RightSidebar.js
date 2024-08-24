import React from 'react'
import { NavLink } from 'react-router-dom'

function RightSidebar() {
    return (
        <div>
            <div className=' w-full flex flex-col items-center'>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/profits/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Profit</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/saledetails/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Sales Details</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/stocks/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Stock Item List</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/remaining/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Remaining List</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/purchase/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Purchase List</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/customers/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Customer List</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to={`/sellers/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>Seller List</NavLink>
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to="/report">Daily/Monthly Report</NavLink>
                {/* <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' >Help</NavLink> */}
                <NavLink className='border border-blue-100 sm:w-full w-80 justify-center flex hover:border-blue-300 hover:font-semibold hover:bg-blue-100' to="/feedback">feedback</NavLink>
            </div>
        </div>
    )
}

export default RightSidebar
