import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
function AddPurchase() {
    const [loading,setLoading]=useState(false)
    const [sale, setSale] = useState();
    const [isOpen, steIsOpen] = useState(false)
    const itemNames = JSON.parse(localStorage.getItem('saleDetails'))
    const [uploadStatus, setUploadStatus] = useState("")
    const sellers = JSON.parse(localStorage.getItem('sellers'))
    const [isOpenSeller, setIsOpenSeller] = useState(false)
    const [nameSeller, setNameSeller] = useState()
    const handleClickOnSellerInput = () => {
        isOpenSeller ? setIsOpenSeller(false) : setIsOpenSeller(true)
        console.log("Clicked on input", isOpenSeller)
    }
    const handleClickOnSellerNAme = (name) => {
        setNameSeller(name)
    }
    const upStatus = () => {
       toast.success("Purchase Added")
    }
    const failStatus = () => {
      toast.error("Some error occurs")
    }
    const [purchaseDetails, setPurchaseDetails] = useState({
        sellerName: '',
        quantity: 0,
        date: '',
        price: 0,
        paidAmmount: 0,
        itemName: '',
        companyName: '',
        email:JSON.parse(localStorage.getItem('login')).user,
        company: {
            id: 0
        },
        item: {
            itemName: 'rc'
        },
        seller: {
            id: 0
        },
        gstInRupee:''
    })
    const handlOnClickItemName = (name) => {
        setSale(name)
        steIsOpen(false)
    }
    const handleOnClicks = () => {
        if (isOpen) {
            steIsOpen(false)
        }
        if (isOpenSeller) {
            setIsOpenSeller(false)
        }
    }
    const handleOnClick = () => {
        isOpen ? steIsOpen(false) : steIsOpen(true)
    }
    const handleEventChange = (e) => {
        setSale(e.target.value)
        setPurchaseDetails({
            quantity: 0,
            date: '',
            price: 0,
            paidAmmount: 0,
            sellerName: '',
            email:JSON.parse(localStorage.getItem('login')).user,
            company: {
                id: 0
            },
            item: {
                itemName: 'item'
            },
            seller:{
                id:0
            },
            gstInRupee:''
        })

    };
    const handleOnChangeevent = (e) => {
        setPurchaseDetails({
            ...purchaseDetails,
            [e.target.name]: e.target.value,
            companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
            itemName: sale,
            sellerName:nameSeller,
            company: {
                id: 0
            },
            item: {
                itemName: ''
            },
            seller: {
                id: 0
            }
        });
    };
    const handleOnSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/purchase/add`,
                purchaseDetails,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }).then((resp) => {
                    upStatus();
                })
        } catch (e) {
            failStatus();
        }
        setLoading(false)
    }
 
    return (
        <div className='h-[45rem]  sm:h-screen'>

            <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 sm:w-10 w-44 sm:hidden flex">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div className=' grid grid-cols-1 sm:grid-cols-4 '>

                <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddpurchase="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-gray-100 justify-center col-span-3' onClick={handleOnClicks}>
                    <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New Purchase</h1></div>
                    <form className="space-y-6 px-5 lg:px-60 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Enter Product name</label>
                            <input id="itemName" name="itemName" onChange={handleEventChange} value={sale} onClick={handleOnClick} type="text" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className="dropdown absolute bg-gray-100 w-[21.8rem] sm:w-[41.8rem]">

                                <ul style={isOpen ? { maxHeight: 300 } : null} className='overflow-y-auto'>
                                    {isOpen && itemNames.map((item, index) => (
                                        item.itemName.toLowerCase().includes(sale ? sale.toLowerCase() : '') ? <button key={index} className='list-none border border-x-2 w-full flex justify-center hover:bg-blue-200' onClick={() => handlOnClickItemName(item.itemName)}>
                                            {item.itemName}
                                        </button> : ''
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="Quantity" className="block text-sm font-medium leading-6 text-gray-900">Quantity</label>
                            </div>
                            <div className="mt-2">
                                <input id="quantity" onChange={(e) => handleOnChangeevent(e)} value={purchaseDetails.quantity} name="quantity" type="number" min='0' required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Date</label>
                            </div>
                            <div className="mt-2">
                                <input id="date" name="date" value={purchaseDetails.date} onChange={(e) => handleOnChangeevent(e)} type="date" className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="Item Name" className="block text-sm font-medium leading-6 text-gray-900">Distributer Name</label>
                            <input id="itemName" name="sellerName" onClick={handleClickOnSellerInput} type="text" value={nameSeller} required onChange={(e) => handleOnChangeevent(e)} className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            <div className="dropdown absolute bg-gray-100 w-[21.8rem] sm:w-[41.8rem]">

                                <ul style={isOpenSeller ? { maxHeight: 300 } : null} className='overflow-y-auto'>
                                    {isOpenSeller && sellers.map((seller, index) => (
                                      (seller.companyName===JSON.parse(localStorage.getItem('companyName')).companyName)?  seller.sellerName.toLowerCase().includes(nameSeller ? nameSeller.toLowerCase() : '') ? <button key={index} className='list-none border border-x-2 w-full flex justify-center hover:bg-blue-200' onClick={() => handleClickOnSellerNAme(seller.sellerName)}>
                                      {seller.sellerName}
                                  </button> : '':''
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="ammount" className="block text-sm font-medium leading-6 text-gray-900">Rate</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="price" type="number" min='0' value={purchaseDetails.price} onChange={(e) => handleOnChangeevent(e)} required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Paid Ammount</label>
                            </div>
                            <div className="mt-2">
                                <input id="amount" name="paidAmmount" type="number" min='0' value={purchaseDetails.paidAmmount} required onChange={(e) => handleOnChangeevent(e)} className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >{loading?<div><img className='w-6 rounded-full' src={loder} alt="" /></div>:"Add Purchase"}</button>
                        </div>
                        <div className='w-full text-center text-xl font-bold text-green-800'>{uploadStatus}</div>
                    </form>

                </div>

            </div>
            <ToastContainer/>
        </div>
    )
}

export default AddPurchase
