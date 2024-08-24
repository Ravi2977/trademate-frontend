import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import crossImage from './cross.png'
import UpdateSale from './UpdateSale';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';

function ExpenseList() {
    const [expenseDetails, setExpenseDetails] = useState([])
    const [shortData, setShortData] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemId, setItemId] = useState(0)
    const [loading, setLoading] = useState(true)

    const remainings = []
    useEffect(() => {
        loadExpenseDetails();
    }, [])
    function sumArray(arr) {
        let sum = 0;
        arr.forEach(num => {
            sum += num;
        });
        return sum;
    }
    const loadExpenseDetails = async () => {
        const saleDetail = await axios.get(`${BASE_URL}/expense/all`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });
        setExpenseDetails(saleDetail.data.reverse())
        setLoading(false)
        // console.log(saleDetail.data.reverse())
    }

    const shortEvent = (e) => {
        setShortData(e.target.value)
    }

    return (
        <div className=' sm:px-10 h-[56rem]'>
            <div className='w-full font-bold text-3xl text-green-600 underline text-center'>Customer List</div>
            <div className="w-full  flex sm:justify-between flex-col sm:flex-row pr-20 items-center">
                <div className='m-2 pl-28 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-blue-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
                <div className='m-2 pl-28 '>
                    <span className='mr-4 font-semibold text-md'>Search By Name</span>
                    <input type='text' className='border border-blue-600 rounded-md m-1 p-1' placeholder='Enter Customer Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                </div>

            </div>
            <div className="sm:px-10 overflow-y-auto sm:h-[27.7rem] m-2">
                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400">

                    <thead className="text-xs text-blue-700 uppercase dark:text-blue-400 sticky z-10 top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Sr no.
                            </th>
                            <th scope="col" className="px-6 py-3 w-24 text-white bg-blue-400 text-center">
                               Who spent
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Spent on
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                date
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Amount               </th>
                         

                        </tr>
                    </thead>
                    <tbody className=''>
                        {(() => {
                            const items = []
                            let j = 0;
                            let k = 0
                            for (let i = expenseDetails.length - 1; i >= 0; i--) {
                                items.push(shortData ? !expenseDetails[i].name.toLowerCase().includes(shortData.toLowerCase()) ? '' :
                                    (expenseDetails[i].email===JSON.parse(localStorage.getItem('login')).user)?<tr key={i} className="border-b border-blue-200 dark:border-blue-700">
                                    <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {++j}
                                    </th>
                                    <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {expenseDetails[i].name}
                                    </th>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {expenseDetails[i].expenseOn}
                                    </td>

                                    <td className={` px-6 py-4 font-medium text-green-700 text-center `}>
                                        {expenseDetails[i].date}
                                    </td>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {expenseDetails[i].amount}
                                    </td>
                                   

                                </tr>:'':
                                    (expenseDetails[i].email===JSON.parse(localStorage.getItem('login')).user)?<tr key={i} className="border-b border-blue-200 dark:border-blue-700">
                                    <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {++j}
                                    </th>
                                    <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {expenseDetails[i].name}
                                    </th>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {expenseDetails[i].expenseOn}
                                    </td>

                                    <td className={` px-6 py-4 font-medium text-green-700 text-center `}>
                                        {expenseDetails[i].date}
                                    </td>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {expenseDetails[i].amount}
                                    </td>
                                   

                                </tr>:''
                                );
                               
                            }
                            return items;

                        })()}

                    </tbody>
                </table>
                {loading?<div className='w-full flex justify-center'><img src={loder} alt="" /></div>:''}
            </div>
        </div>

    )
}

export default ExpenseList