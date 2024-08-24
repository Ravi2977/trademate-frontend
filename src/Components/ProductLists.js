import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import UpdateProduct from './UpdateProduct';
import crossImage from './cross.png';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';

function ProductLists() {
    const [productDetailss, setProductDetails] = useState([])
    const [shortData, setShortData] = useState('')
    const [update, setUpdate] = useState(false)
    const [itemName, setItemName] = useState('')
    const [loading, setLoading] = useState(true)
    const shortEvent = (e) => {
        setShortData(e.target.value)

    }
    useEffect(() => {
        loadProducts();
    }, [])
    const loadProducts = async () => {
        const productDetails = await axios.post(`${BASE_URL}/stock/all`, { companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
    email:JSON.parse(localStorage.getItem('login')).user }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            }
        });
        setProductDetails(productDetails.data.reverse())
        setLoading(false)
    }
    const handleOnClickUpdate = (itemName) => {
        setUpdate(true)
        setItemName(itemName)

    }
    const handleOnclickBody = () => {
        setUpdate(false)
        loadProducts()
    }
    return (
        <div className='grid grid-cols-4 pt-10'>
          <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddcustomer="bold" />
                    <RightSidebar />
                </div>
            <div className='w-full col-span-3 sm:px-10 h-[34.8rem] '>
                <div className='m-3 pl-28  '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black flex w-44 sm:hidden rounded-md sm:px-3 p-2 text-sm font-medium bg-blue-800 text-white border border-blue-200 sm:w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
                <div className='flex justify-center w-full ml-16 sm:ml-0 text-3xl  text-green-800 font-bold'>Stock Item List</div>
                <div className="h-10 m-6 sm:m-1">
                    <span className='mr-4 font-semibold text-md'>Search By Name</span>
                    <input type='text' className='border sm:mr-4  border-blue-600 rounded-md m-1 mr-6 p-1' placeholder='Enter Product Name' value={shortData} onChange={(e) => shortEvent(e)}></input>
                </div>

                {update && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
                )}
                {/* UpdateSale component */}
                {update ?
                    <div className="fixed flex justify-center top-40 left-1/2 bg-white border border-black shadow-md rounded-md z-50">
                        <div className='fixed h-80 p-10 bg-blue-50 rounded-lg mt-24  shadow-2xl' id='updateProduct'>
                            <div className='w-full h-10 text-right'> <button className='h-6 w-6 m-2 transition-all hover:h-8 hover:w-8 hover:m-1' onClick={handleOnclickBody}><img src={crossImage} alt="" /></button></div>
                            <UpdateProduct itemName={`${itemName}`} setUpdate={setUpdate} myFunction={loadProducts} />
                        </div>
                    </div> : ''}

                <div className='m-2 w-[24.7rem] sm:w-full h-[28rem] overflow-y-auto'>
                    <table className="text-sm text-left rtl:text-right text-blue-500 dark:text-blue-400 border border-black">
                        <thead className="text-xs text-blue-700 uppercase z-10 sticky top-0">
                            <tr>
                                <th scope="col" className="px-7 py-3 w-3 text-center  text-white bg-blue-400 ">
                                    Sn. No.
                                </th>
                                <th scope="col" className="px-6  py-3 w-60 text-center   text-white bg-blue-400">
                                    Item Name
                                </th>
                                <th scope="col" className="px-6 py-3  text-center w-40 text-white bg-blue-400">
                                    Purchase Price
                                </th>
                                <th scope="col" className="px-6 py-3 w-36 text-center  text-white bg-blue-400">
                                    Gst in Percentage
                                </th>
                                <th scope="col" className="px-6 py-3 w-36 text-center  text-white bg-blue-400">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3 w-32 text-center  text-white bg-blue-400 ">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {productDetailss.reverse().map((productDetails, index) => (
                            shortData ? !productDetails.itemName.toLowerCase().includes(shortData.toLowerCase()) ? '' : 
                            <tbody key={index + 1} className='border border-x-2 my-10'>
                                <tr className="border border-blue-200 align-middle">
                                    <td scope="row" className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {index + 1}
                                    </td>
                                    <td scope="row" className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.itemName.length > 20 ? productDetails.itemName.slice(0, 17) + "..." : productDetails.itemName}
                                    </td>
                                    <td className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.purchasePrice}
                                    </td>
                                    <td className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.gstInPercent}%
                                    </td>
                                    <td className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.quantity}
                                    </td>
                                    <td className={`border border-x-2 font-medium text-center text-green-600 ${productDetails.quantity > 3 ? "bg-white" : "bg-red-600"} flex justify-center items-center `}>
                                        <NavLink className='border border-x-2 py-2 px-2 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(productDetails.itemName)} >Update Price</NavLink>
                                    </td>
                                </tr>

                            </tbody> : 
                            <tbody key={index + 1} className='border border-x-2 my-10'>
                                <tr className="border border-blue-200 align-middle">
                                    <td scope="row" className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {index + 1}
                                    </td>
                                    <td scope="row" className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.itemName.length > 14 ? productDetails.itemName.slice(0, 10) + "..." : productDetails.itemName}
                                    </td>
                                    <td className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.purchasePrice}
                                    </td>
                                    <td className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.gstInPercent}%
                                    </td>
                                    <td className={`border border-x-2 px-6 py-2 text-center font-medium ${productDetails.quantity > 3 ? "bg-white" : "bg-red-500 text-white"} `}>
                                        {productDetails.quantity}
                                    </td>
                                    <td className={`border border-x-2 font-medium text-center text-green-600 ${productDetails.quantity > 3 ? "bg-white" : "bg-red-600"} flex justify-center items-center `}>
                                        <NavLink className='border border-x-2 py-2 px-2 rounded-xl bg-red-300 hover:bg-green-600 hover:text-white transition-all' onClick={() => handleOnClickUpdate(productDetails.itemName)} >Update Price</NavLink>
                                    </td>
                                </tr>

                            </tbody>

                        ))
                        }
                    </table>
                    <div className='w-full flex justify-center'> {
                        loading ? <div className='w-full flex justify-center'><img className='' src={loder} alt="" /></div> : ''
                    }</div>
                </div>

            </div>

        </div>


    )
}

export default ProductLists
