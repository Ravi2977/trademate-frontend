import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationButtons(props) {
  const navlinkStyle = "m-2 p-2 border w-80 sm:w-full  border-blue-100 flex justify-center text-blue-700 hover:bg-blue-100 hover:border-blue-300 hover:font-semibold hover:shadow-md hover:scale-105 transition-transform rounded-lg";

  return (
    <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex flex-col items-center">
      <div>
        <NavLink className={navlinkStyle} to={`/profits/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>
          Profit and Remaining
        </NavLink>
        <NavLink className={navlinkStyle} to={`/remaining/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>
          Remaining
        </NavLink>
        <NavLink className={navlinkStyle} to={`/gst/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>
          GST
        </NavLink>
     
      </div>
      <div>
        <NavLink className={navlinkStyle} to={`/saledetails/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>
          Sales Details
        </NavLink>
        <NavLink className={navlinkStyle} to={`/purchase/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>
          Purchase Details
        </NavLink>
        <NavLink className={navlinkStyle} to={`/expenselist`}>
          Expenses
        </NavLink>
      
      </div>
      <div>
        <NavLink className={navlinkStyle} to={`/stocks/${JSON.parse(localStorage.getItem('companyName')).companyName}`}>
          Stock Items
        </NavLink>
        <NavLink to={`/customers/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className={navlinkStyle}>
          Customer List
        </NavLink>
        <NavLink to={`/sellers/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className={navlinkStyle}>
          Seller List
        </NavLink>
      
      </div>
    </div>
  );
}

export default NavigationButtons;
