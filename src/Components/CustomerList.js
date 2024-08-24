import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import crossImage from './cross.png'
import UpdateSale from './UpdateSale';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';

function CustomerList() {
    const [customerDetails, setCustomerDetails] = useState([])
    const [shortData, setShortData] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemId, setItemId] = useState(0)
    const [loading, setLoading] = useState(true)

    const remainings = []
    useEffect(() => {
        loadcustomerDetails();
    }, [])
    function sumArray(arr) {
        let sum = 0;
        arr.forEach(num => {
            sum += num;
        });
        return sum;
    }
    const loadcustomerDetails = async () => {
        const saleDetail = await axios.get(`${BASE_URL}/customer/all`,
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });
        setCustomerDetails(saleDetail.data.reverse())
        setLoading(false)
        // console.log(saleDetail.data.reverse())
    }

    const shortEvent = (e) => {
        setShortData(e.target.value)
    }
    // const handleOnClickUpdate = (id, itemName) => {
    //     setUpdate(true)
    //     setItemName(itemName)
    //     setItemId(id)

    // }
    // const handleOnclickBody = () => {
    //     // setUpdate(false)
    //     loadcustomerDetails()
    // }

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
            {/* {update && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
                        )} */}
            {/* UpdateSale component */}
            {/* {update &&
                <div className="fixed flex justify-center top-40 left-1/2 bg-white border border-black shadow-md rounded-md z-50">
                    <div className='fixed h-80 p-10 bg-blue-50 rounded-lg  shadow-2xl' id='updateProduct'>
                        <div className='w-full h-10 text-right'> <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}><img src={crossImage} alt="" /></button></div>
                        <UpdateSale itemName={`${itemName}`} id={`${itemId}`} setUpdate={setUpdate} myFunction={loadcustomerDetails} />
                    </div>
                </div>
            } */}
            <div className="sm:px-10 overflow-y-auto sm:h-[27.7rem] m-2">
                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400">

                    <thead className="text-xs text-blue-700 uppercase dark:text-blue-400 sticky z-10 top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Sr no.
                            </th>
                            <th scope="col" className="px-6 py-3 w-24 text-white bg-blue-400 text-center">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Mobile
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Gst In               </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                State
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Country
                            </th>

                        </tr>
                    </thead>
                    <tbody className=''>
                        {(() => {
                            const items = []
                            let j = 0;
                            let k = 0
                            for (let i = customerDetails.length - 1; i >= 0; i--) {
                                items.push(shortData ? !customerDetails[i].customerName.toLowerCase().includes(shortData.toLowerCase()) ? '' :
                                (customerDetails[i].companyName===JSON.parse(localStorage.getItem('companyName')).companyName && customerDetails[i].email===JSON.parse(localStorage.getItem('login')).user )?
                                   <tr key={i} className="border-b border-blue-200 dark:border-blue-700">
                                   <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                       {++j}
                                   </th>
                                   <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                       {customerDetails[i].customerName}
                                   </th>
                                   <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                       {customerDetails[i].address}
                                   </td>

                                   <td className={` px-6 py-4 font-medium text-green-700 text-center `}>
                                       {customerDetails[i].mobile}
                                   </td>
                                   <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                       {customerDetails[i].gstIn}
                                   </td>
                                   <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                       {customerDetails[i].state}
                                   </td>
                                   <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                       {customerDetails[i].country}
                                   </td>

                               </tr>:''


                                    :
                                    (customerDetails[i].companyName===JSON.parse(localStorage.getItem('companyName')).companyName && customerDetails[i].email===JSON.parse(localStorage.getItem('login')).user )?
                                    <tr key={i} className="border-b border-blue-200 dark:border-blue-700">
                                    <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {++j}
                                    </th>
                                    <th scope="row" className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {customerDetails[i].customerName}
                                    </th>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {customerDetails[i].address}
                                    </td>
 
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center `}>
                                        {customerDetails[i].mobile}
                                    </td>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {customerDetails[i].gstIn}
                                    </td>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {customerDetails[i].state}
                                    </td>
                                    <td className={` px-6 py-4 font-medium text-green-700 text-center`}>
                                        {customerDetails[i].country}
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

export default CustomerList
