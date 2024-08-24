import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, json } from 'react-router-dom';
import crossImage from './cross.png'
import UpdateSale from './UpdateSale';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';
function SaleDetails() {
    const [saleDetails, setSaleDetails] = useState([])
    const [shortData, setShortData] = useState('')
    const [update, setUpdate] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemId, setItemId] = useState(0)
    const [loading, setLoading] = useState(true)
    function changeNumberToMonth(currentMonth) {
        let month = ""
        switch (currentMonth) {
            case 1:
                month = "Jan"
                break;
            case 2:
                month = "Feb"
                break;
            case 3:
                month = "Mar"
                break;
            case 4:
                month = "Apr"
                break;
            case 5:
                month = "May"
                break;
            case 6:
                month = "June"
                break;
            case 7:
                month = "July"
                break;
            case 8:
                month = "Aug"
                break;
            case 9:
                month = "Sep"
                break;
            case 10:
                month = "Oct"
                break;
            case 11:
                month = "Nov"
                break;
            case 12:
                month = "Dec"
                break;
            default:
                month = null
        }
        return month;
    }
    useEffect(() => {
        loadSaleDetails();
    }, [])
    const loadSaleDetails = async () => {
        const saleDetail = await axios.post(`${BASE_URL}/sales/allsaledetails`,
            { companyName: JSON.parse(localStorage.getItem('companyName')).companyName },
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });
        setSaleDetails(saleDetail.data)
        setLoading(false)

        // console.log(saleDetails[i].data.reverse())
    }
    const deleteOnClick = async (id, e) => {
        e.preventDefault()
        const confirm = window.confirm("Are you Sure to Delete")
        console.log(confirm)
        if (confirm) {
            await axios.delete(`${BASE_URL}/sales/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            })
        }
        loadSaleDetails()
    }
    const viewSale = (id) => {
        console.log("clicked on :-", id)
    }
    const shortEvent = (e) => {
        setShortData(e.target.value)
    }
    const handleOnClickUpdate = (id, itemName) => {
        setUpdate(true)
        setItemName(itemName)
        setItemId(id)

    }
    const handleOnclickBody = () => {
        setUpdate(false)
        loadSaleDetails()
    }

    return (
        <div className=" sm:h-[34.7rem]">
            {/* Overlay to disable background */}
            {update && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
            )}
            {update &&
                <div className="fixed flex justify-center top-40 left-1/2 bg-white border border-black shadow-md rounded-md z-50">
                    <div className='fixed h-80 p-10 bg-blue-50 rounded-lg  shadow-2xl' id='updateProduct'>
                        <div className='w-full h-10 text-right'> <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}><img src={crossImage} alt="" /></button></div>
                        <UpdateSale itemName={`${itemName}`} id={`${itemId}`} setUpdate={setUpdate} myFunction={loadSaleDetails} />
                    </div>
                </div>
            }
            <div className='w-full text-center font-bold text-3xl text-green-800 mt-4'>Sale Details</div>
            <div className="w-full  flex sm:justify-between flex-col sm:flex-row pr-20 items-center">
                <div className='m-3 pl-28 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md sm:px-3 p-2 text-sm font-medium bg-blue-800 text-white border border-blue-200 w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
                <div className='m-3 pl-28 '>
                    <span className='mr-4 mt-2 font-semibold text-md '>Search By Name</span>
                    <input type='text' className='border border-blue-600 rounded-md m-1 p-1' placeholder='Enter Customer Name' value={shortData} onChange={(e) => setShortData(e.target.value)}></input>
                </div>
            </div>
            <div className='sm:px-10 overflow-y-auto sm:h-[27.7rem] m-2'>

                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400 border border-black">

                    <thead className="text-xs text-blue-700 uppercase dark:text-blue-400 z-10 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Sr.no
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Customer Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3  text-white bg-blue-400 text-center">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Total Ammount
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Received Ammount                </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">
                                Remaining
                            </th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400  text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className=''>
                        {(() => {
                            const items = []
                            let j = 0
                            for (let i = saleDetails.length - 1; i >= 0; i--) {
                                if (i === 0 && loading !== false) {
                                    setLoading(false)
                                }
                                items.push(shortData ? !saleDetails[i].customerName.toLowerCase().includes(shortData.toLowerCase()) ? '' :
                                    (saleDetails[i].email === JSON.parse(localStorage.getItem('login')).user) ?
                                        <tr className="border-b border-blue-200 dark:border-blue-900">
                                            <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {j + 1}
                                            </th>
                                            <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                            </th>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].quantity}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                                {saleDetails[i].totalAmmount}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].receivedAmmount}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].date.split('-')[2] + "/" + changeNumberToMonth(parseInt(saleDetails[i].date.split('-')[1])) + '/' + saleDetails[i].date.split('-')[0]}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].remaining}
                                            </td>

                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(saleDetails[i].id, saleDetails[i].customerName)}>Received</NavLink>
                                                <NavLink onClick={(e) => deleteOnClick(saleDetails[i].id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                                                <NavLink className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetails[i].id}`}>Invoice</NavLink>
                                            </td>
                                        </tr> : '' :
                                    (saleDetails[i].email === JSON.parse(localStorage.getItem('login')).user) ?
                                        <tr className="border-b border-blue-200 dark:border-blue-900">
                                            <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {j + 1}
                                            </th>
                                            <th scope="row" className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].customerName.length > 25 ? saleDetails[i].customerName.slice(0, 22) + "..." : saleDetails[i].customerName}
                                            </th>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].itemName.length > 19 ? saleDetails[i].itemName.slice(0, 16) + "..." : saleDetails[i].itemName}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].quantity}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center `}>
                                                {saleDetails[i].totalAmmount}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].receivedAmmount}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].date.split('-')[2] + "/" + changeNumberToMonth(parseInt(saleDetails[i].date.split('-')[1])) + '/' + saleDetails[i].date.split('-')[0]}
                                            </td>
                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                {saleDetails[i].remaining}
                                            </td>

                                            <td className={` px-6 py-4 font-medium ${saleDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${saleDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                <NavLink className='border border-x-2 py-2 px-4 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(saleDetails[i].id, saleDetails[i].customerName)}>Received</NavLink>
                                                <NavLink onClick={(e) => deleteOnClick(saleDetails[i].id, e)} className='border border-x-2 py-2 px-4 rounded-xl m-1 bg-red-300 hover:bg-green-600 hover:text-white transition-all'>Delete</NavLink>
                                                <NavLink className='border border-x-2 py-2 px-4 rounded-xl  bg-red-300 hover:bg-green-600 hover:text-white transition-all' to={`/invoice/${saleDetails[i].id}`}>Invoice</NavLink>
                                            </td>
                                        </tr> : ''
                                );

                                j++

                            }

                            return items;
                        })()

                        }
                    </tbody>

                </table>
                <div className='w-full flex justify-center'> {
                    loading ? <div className='w-full flex justify-center'><img className='' src={loder} alt="" /></div> : ''
                }</div>
            </div>

        </div>
    )
}

export default SaleDetails