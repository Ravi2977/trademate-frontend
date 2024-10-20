import React, { useEffect, useState } from 'react';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import { NavLink } from 'react-router-dom';
import loder from './loader.gif';
import { BASE_URL } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function AddSale() {
    const [loading, setLoading] = useState(false);
    const [sale, setSale] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [isOpen, steIsOpen] = useState(false);
    const [isOpenCust, setIsOpenCust] = useState(true);
    const [itemNames, setItemNames] = useState([]);
    const [customers, setCustomers] = useState([]);
    const token = JSON.parse(localStorage.getItem("login")).token;

    const handleEventChange = (e) => {
        setSale(e.target.value);
    };

    const [company, setCompany] = useState({
        companyId: localStorage.getItem("cId")
    });

    useEffect(() => {
        fetchCustomers();
        fetchProducts();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/customer/allCustomersByCompany/${localStorage.getItem("cId")}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ""}`
                },
            });
            setCustomers(response.data);
        } catch (error) {
            toast.error("Error fetching customers");
            console.error("Error fetching customers:", error);
        }
    };


    const fetchProducts = async () => {

        try {
            const response = await axios.post(`${BASE_URL}/stock/all`, company, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ""}`
                },
            });
            setItemNames(response.data);
        } catch (error) {
            toast.error("Error fetching products");
            console.error("Error fetching products:", error);
        }
    };

    const handleOnClick = () => {
        isOpen ? steIsOpen(false) : steIsOpen(true);
    };

    const handleOnClicks = () => {
        if (isOpen) steIsOpen(false);
        if (isOpenCust) setIsOpenCust(false);
    };

    const handlOnClickItemName = (name, id) => {
        setSale(name);
        setSaleDetail(prevState => ({
            ...prevState,
            item: { ...prevState.item, itemId: id }
        }));
        steIsOpen(false);
    };

    const handleOnClicksCustomerInput = () => {
        isOpenCust ? setIsOpenCust(false) : setIsOpenCust(true);
    };

    const handlOnClickCustomerName = (name, id) => {
        setCustomerName(name);
        setSaleDetail(prevState => ({
            ...prevState,
            customer: { ...prevState.customer, id }
        }));
        setIsOpenCust(false);
    };

    const handleEcustomerNameChange = (e) => {
        setCustomerName(e.target.value);
    };

    const [saleDetail, setSaleDetail] = useState({
        item: { itemId: '' },
        quantity: 0,
        date: '',
        id: "",
        rate: 0,
        receivedAmmount: 0,
        company: { companyId: localStorage.getItem("cId") },
        customer: { id: 0 },
        gstInRupee: 0
    });

    const onEventChange = (e) => {
        const { name, value } = e.target;
        setSaleDetail(prevSale => ({
            ...prevSale,
            [name]: value,
            companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
            itemName: sale,
            customerName: customerName
        }));
    };

    const handleOnSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/sales/addSale`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token ? token : ""}`
                },
                body: JSON.stringify(saleDetail)
            });

            if (response.ok) {
                setSaleDetail({
                    item: { itemId: '' },
                    quantity: 0,
                    date: '',
                    id: "",
                    rate: 0,
                    receivedAmmount: 0,
                    company: { companyId: localStorage.getItem("cId") },
                    customer: { id: 0 }
                });
                toast.success("Sale added successfully");
            } else {
                toast.error("Failed to add sale");
            }
        } catch (error) {
            toast.error("Error while adding sale");
            console.error("Error while adding sale:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='h-[46rem] sm:h-screen'>
            <div className='m-3'><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 sm:w-10 w-44 sm:hidden flex">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div className=' grid grid-cols-1 sm:grid-cols-4 '>

                <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddSale="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-gray-100 justify-center col-span-3' onClick={handleOnClicks} >
                    <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Sale Entry</h1></div>
                    {/* <div className='w-full flex justify-center h-10 '>{loading?<img className='h-10' src={loder} alt="" />:''}</div> */}
                    <form className="space-y-6 px-4 sm:px-60 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                        <div className="w-full relative">
                            <label htmlFor="customerName" className="block text-sm font-medium leading-6 text-gray-900">
                                Select Customer
                            </label>
                            <input
                                value={customerName}
                                onChange={(e) => handleEcustomerNameChange(e)}
                                id="customerName"
                                name="customerName"
                                type="text"
                                onClick={handleOnClicksCustomerInput}
                                required
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            {isOpenCust && (
                                <div className="dropdown absolute bg-gray-100 w-full">
                                    <ul className='overflow-hidden'>
                                        {customers.map((customer, index) => (
                                            <li key={index} className='list-none'>
                                                <button
                                                    className='w-full flex justify-center border border-x-2 hover:bg-blue-200'
                                                    onClick={() => handlOnClickCustomerName(customer.customerName, customer.id)}
                                                >
                                                    {customer.customerName}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.date} onChange={(e) => onEventChange(e)} id="date" name="date" type="date" className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="Quantity" className="block text-sm font-medium leading-6 text-gray-900">Select Item</label>
                        </div>
                        <div className='w-full relative'>
                            <input
                                name="user"
                                onClick={handleOnClick}
                                value={sale}
                                onChange={handleEventChange}
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                            />

                            <div className="dropdown absolute bg-gray-100 w-full">
                                <ul style={isOpen ? { maxHeight: 300 } : null} className='overflow-y-auto w-full'>
                                    {isOpen && itemNames.map((item, index) => (
                                        <button
                                            key={index}
                                            className='list-none border border-x-2 w-full flex justify-center hover:bg-blue-200'
                                            onClick={() => handlOnClickItemName(item.itemName,item.itemId)}>
                                            {item.itemName}
                                        </button>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="Quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.quantity} onChange={(e) => onEventChange(e)} id="quantity" name="quantity" type="number" min='1' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="ammount" className="block text-sm font-medium leading-6 text-gray-900">Rate</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.rate} onChange={(e) => onEventChange(e)} id="amount" name="rate" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Received Ammount</label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.receivedAmmount} onChange={(e) => onEventChange(e)} id="amount" name="receivedAmmount" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <div><img className='w-6 rounded-full' src={loder} alt="" /></div> : "Add Sale"}</button>
                        </div>
                  
                    </form>

                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default AddSale
