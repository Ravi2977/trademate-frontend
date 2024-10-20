import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import crossImage from './cross.png';
import UpdatePurchase from './UpdatePurchase';
import loder from './loader.gif';
import { BASE_URL } from './AuthContext';

function PurchaseList() {
    const [purchaseDetails, setPurchaseDetails] = useState([]);
    const [shortData, setShortData] = useState('');
    const [update, setUpdate] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemId, setItemId] = useState(0);
    const [loading, setLoading] = useState(true);
    const totalRemaining = [];
    const totalShortedRemaining = [];

    function changeNumberToMonth(currentMonth) {
        let month = "";
        switch (currentMonth) {
            case 1:
                month = "Jan";
                break;
            case 2:
                month = "Feb";
                break;
            case 3:
                month = "Mar";
                break;
            case 4:
                month = "Apr";
                break;
            case 5:
                month = "May";
                break;
            case 6:
                month = "June";
                break;
            case 7:
                month = "July";
                break;
            case 8:
                month = "Aug";
                break;
            case 9:
                month = "Sep";
                break;
            case 10:
                month = "Oct";
                break;
            case 11:
                month = "Nov";
                break;
            case 12:
                month = "Dec";
                break;
            default:
                month = null;
        }
        return month;
    }

    useEffect(() => {
        loadPurchaseDetails();
    }, []);

    const loadPurchaseDetails = async () => {
        const purchaseDetail = await axios.post(`${BASE_URL}/purchase/getbycompany`,
            { companyName: JSON.parse(localStorage.getItem('companyName')).companyName },
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }
        );
        setPurchaseDetails(purchaseDetail.data);
        setLoading(false);
    };

    const deleteOnClick = async (id, e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you Sure to Delete");
        if (confirm) {
            await axios.delete(`${BASE_URL}/sales/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });
        }
        loadPurchaseDetails();
    };

    const viewSale = (id) => {
        console.log("clicked on :-", id);
    };

    const shortEvent = (e) => {
        setShortData(e.target.value);
    };

    const handleOnClickUpdate = (id, itemName) => {
        setUpdate(true);
        setItemName(itemName);
        setItemId(id);
    };

    const handleOnclickBody = () => {
        setUpdate(false);
        loadPurchaseDetails();
    };

    return (
        <div className="sm:h-[34.6rem] h-[40rem] ">
            <div className='w-full text-center font-bold text-3xl text-green-800 mt-4'>Purchase Details</div>
            <div className="w-full flex sm:justify-between flex-col sm:flex-row pr-20 items-center">
                <div className='m-3 pl-28 '>
                    <NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md sm:px-3 p-2 text-sm font-medium bg-blue-800 text-white border border-blue-200 w-10">
                        {localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}
                    </NavLink>
                </div>
                <div className='m-3 pl-28 '>
                    <span className='mr-4 mt-2 font-semibold text-md '>Search By Name</span>
                    <input type='text' className='border border-blue-600 rounded-md m-1 p-1' placeholder='Enter Seller Name' value={shortData} onChange={(e) => setShortData(e.target.value)}></input>
                </div>
            </div>

            {update && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
            )}

            {/* UpdatePurchase component */}
            {update && (
                <div className="absolute flex justify-center sm:top-40 left-1/2 bg-white border border-black shadow-md rounded-md z-50 mx-5">
                    <div className='fixed h-80 p-10 bg-blue-50 rounded-lg mt-24 shadow-2xl' id='updateProduct'>
                        <div className='w-full h-10 text-center sm:text-right'>
                            <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}>
                                <img src={crossImage} alt="" />
                            </button>
                        </div>
                        <UpdatePurchase itemName={itemName} id={itemId} setUpdate={setUpdate} myFunction={loadPurchaseDetails} />
                    </div>
                </div>
            )}

            <div className='sm:px-10 overflow-y-auto h-[400px]'>
                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400 border border-black">
                    <thead className="text-xs text-blue-700 uppercase dark:text-blue-400 z-10 sticky top-0">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Sr.no</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Seller Name</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Product</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Quantity</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Total Amount</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Paid Amount</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Date</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Remaining</th>
                            <th scope="col" className="px-6 py-3 text-white bg-blue-400 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(() => {
                            const items = [];
                            let j = 0;
                            for (let i = purchaseDetails.length - 1; i >= 0; i--) {
                                if (purchaseDetails[i].remaining > 0 && purchaseDetails[i].email === JSON.parse(localStorage.getItem('login')).user) {
                                    totalRemaining.push(purchaseDetails[i].remaining);
                                }
                                if (purchaseDetails[i].remaining > 0 && shortData && purchaseDetails[i].sellerName.toLowerCase().includes(shortData.toLowerCase()) && purchaseDetails[i].email === JSON.parse(localStorage.getItem('login')).user) {
                                    totalShortedRemaining.push(purchaseDetails[i].remaining);
                                }
                                items.push(
                                    shortData ? (!purchaseDetails[i].sellerName.toLowerCase().includes(shortData.toLowerCase()) ? '' :
                                        (purchaseDetails[i].email === JSON.parse(localStorage.getItem('login')).user) ?
                                            <tr key={i} className="border-b border-blue-200 dark:border-blue-900">
                                                <th scope="row" className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{j + 1}</th>
                                                <th scope="row" className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].sellerName.length > 25 ? purchaseDetails[i].sellerName.slice(0, 22) + "..." : purchaseDetails[i].sellerName}</th>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].itemName.length > 25 ? purchaseDetails[i].itemName.slice(0, 23) + "..." : purchaseDetails[i].itemName}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].quantity}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].totalAmount}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].paidAmount}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].date}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].remaining}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                    <NavLink to={`/viewSale/${purchaseDetails[i].id}`}>
                                                        <button onClick={() => viewSale(purchaseDetails[i].id)} className="mr-2 text-green-800 transition-all hover:scale-125"><i className="fa fa-eye"></i></button>
                                                    </NavLink>
                                                    <button onClick={(e) => deleteOnClick(purchaseDetails[i].id, e)} className="mr-2 text-red-800 transition-all hover:scale-125"><i className="fa fa-trash"></i></button>
                                                    <button onClick={() => handleOnClickUpdate(purchaseDetails[i].id, purchaseDetails[i].itemName)} className="mr-2 text-blue-800 transition-all hover:scale-125"><i className="fa fa-pencil"></i></button>
                                                </td>
                                            </tr>
                                            : '') :
                                        (purchaseDetails[i].email === JSON.parse(localStorage.getItem('login')).user) ?
                                            <tr key={i} className="border-b border-blue-200 dark:border-blue-900">
                                                <th scope="row" className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{j + 1}</th>
                                                <th scope="row" className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].sellerName.length > 25 ? purchaseDetails[i].sellerName.slice(0, 22) + "..." : purchaseDetails[i].sellerName}</th>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].itemName.length > 25 ? purchaseDetails[i].itemName.slice(0, 23) + "..." : purchaseDetails[i].itemName}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].quantity}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].totalAmount}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].paidAmount}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].date}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>{purchaseDetails[i].remaining}</td>
                                                <td className={`px-6 py-4 font-medium ${purchaseDetails[i].remaining > 0 ? 'text-white' : 'text-green-600'} ${purchaseDetails[i].remaining > 0 ? 'bg-red-600' : 'bg-white'} text-center`}>
                                                    <NavLink to={`/viewSale/${purchaseDetails[i].id}`}>
                                                        <button onClick={() => viewSale(purchaseDetails[i].id)} className="mr-2 text-green-800 transition-all hover:scale-125"><i className="fa fa-eye"></i></button>
                                                    </NavLink>
                                                    <button onClick={(e) => deleteOnClick(purchaseDetails[i].id, e)} className="mr-2 text-red-800 transition-all hover:scale-125"><i className="fa fa-trash"></i></button>
                                                    <button onClick={() => handleOnClickUpdate(purchaseDetails[i].id, purchaseDetails[i].itemName)} className="mr-2 text-blue-800 transition-all hover:scale-125"><i className="fa fa-pencil"></i></button>
                                                </td>
                                            </tr> : '');

                                j = j + 1;
                            }
                            return items;
                        })()}
                    </tbody>
                </table>
            </div>
            {loading && (
                <div className="flex items-center justify-center mt-6">
                    <img className="w-14 h-14" src={loder} alt="Loading..." />
                </div>
            )}
        </div>
    );
}

export default PurchaseList;
