import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import crossImage from './cross.png';
import UpdateSale from './UpdateSale';
import loder from './loader.gif';
import { BASE_URL } from './AuthContext';

function SaleDetails() {
    const [saleDetails, setSaleDetails] = useState([]);
    const [shortData, setShortData] = useState('');
    const [update, setUpdate] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemId, setItemId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [company] = useState({
        companyId: localStorage.getItem("cId")
    });

    function changeNumberToMonth(currentMonth) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[currentMonth - 1] || null;
    }

    useEffect(() => {
        loadSaleDetails();
    }, []);

    const loadSaleDetails = async () => {
        const saleDetail = await axios.post(`${BASE_URL}/sales/allsaledetails`, company, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
            }
        });
        setSaleDetails(saleDetail.data);
        setLoading(false);
    };

    const deleteOnClick = async (id, e) => {
        e.preventDefault();
        const confirm = window.confirm("Are you sure to delete?");
        if (confirm) {
            await axios.delete(`${BASE_URL}/sales/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });
        }
        loadSaleDetails();
    };

    const viewSale = (id) => {
        console.log("Clicked on:", id);
    };

    const handleOnClickUpdate = (id, itemName) => {
        setUpdate(true);
        setItemName(itemName);
        setItemId(id);
    };

    const handleOnclickBody = () => {
        setUpdate(false);
        loadSaleDetails();
    };

    function formatDate(date) {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(date)
            .toLocaleDateString('en-GB', options)
            .toUpperCase()
            .replace(/ /g, '-')
            .replace(',', '');
    }

    // Filter saleDetails based on search input
    const filteredSaleDetails = saleDetails.filter(sale =>
        sale.customer.customerName.toLowerCase().includes(shortData.toLowerCase())
    );

    return (
        <div className="sm:h-[34.7rem]">
            {/* Overlay to disable background */}
            {update && (
                <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
            )}
            {update && (
                <div className="fixed flex justify-center top-40 left-1/2 bg-white border border-black shadow-md rounded-md z-50">
                    <div className='fixed h-80 p-10 bg-blue-50 rounded-lg shadow-2xl' id='updateProduct'>
                        <div className='w-full h-10 text-right'>
                            <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}>
                                <img src={crossImage} alt="close" />
                            </button>
                        </div>
                        <UpdateSale itemName={itemName} id={itemId} setUpdate={setUpdate} myFunction={loadSaleDetails} />
                    </div>
                </div>
            )}
            <div className='w-full text-center font-bold text-3xl text-green-800 mt-4'>Sale Details</div>
            <div className="w-full flex sm:justify-between flex-col sm:flex-row pr-20 items-center">
                <div className='m-3 pl-28'>
                    <NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`}
                        className="hover:bg-blue-400 hover:text-black rounded-md sm:px-3 p-2 text-sm font-medium bg-blue-800 text-white border border-blue-200">
                        {localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}
                    </NavLink>
                </div>
                <div className='m-3 pl-28'>
                    <span className='mr-4 mt-2 font-semibold text-md'>Search By Name</span>
                    <input
                        type='text'
                        className='border border-blue-600 rounded-md m-1 p-1'
                        placeholder='Enter Customer Name'
                        value={shortData}
                        onChange={(e) => setShortData(e.target.value)}
                    />
                </div>
            </div>
            <div className='sm:px-10 overflow-y-auto sm:h-[27.7rem] m-2'>
                <table className="w-full text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400 border border-black">
                    <thead className="text-xs text-blue-700 uppercase dark:text-blue-400 bg-blue-400 z-10 sticky top-0">
                        <tr>
                            {["Sr.no", "Customer Name", "Product", "Quantity", "Total Amount", "Received Amount", "Date", "Remaining", "Actions"].map(header => (
                                <th key={header} className="px-6 py-3 text-white text-center">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSaleDetails.map((sale, index) => (
                            <tr
                                key={sale.id}
                                className={`border-b border-blue-200 dark:border-blue-900 ${sale.remaining > 0 ? 'bg-red-200' : ''}`} // Light red background if remaining > 0
                            >
                                <td className="px-6 py-4 text-center">{index + 1}</td>
                                <td className="px-6 py-4 text-center">{sale.customer.customerName}</td>
                                <td className="px-6 py-4 text-center">{sale.item.itemName}</td>
                                <td className="px-6 py-4 text-center">{sale.quantity}</td>
                                <td className="px-6 py-4 text-center">{sale.totalAmmount}</td>
                                <td className="px-6 py-4 text-center">{sale.receivedAmmount}</td>
                                <td className="px-6 py-4 text-center">{formatDate(sale.date)}</td>
                                <td className="px-6 py-4 text-center">{sale.remaining}</td>
                                <td className="px-6 py-4 text-center">
                                    <button onClick={() => viewSale(sale.id)} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">View</button>
                                    <button onClick={(e) => deleteOnClick(sale.id, e)} className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
                                    <NavLink to={`/invoice/${sale.id}`} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Invoice</NavLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && (
                    <div className='w-full flex justify-center'>
                        <img src={loder} alt="Loading" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SaleDetails;
