import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import html2pdf from 'html2pdf.js';
import RightSidebar from './RightSidebar';
import LeftSidbar from './LeftSidbar';
import { BASE_URL } from './AuthContext';
function Invoice() {
    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [gst, setGst] = useState(false)
    const [custDetail, setCustDetail] = useState({

    })
    const [invoicePrefixArr, setInvoicePrefixArr] = useState([])
    const [address, setAddress] = useState('')
    const [custName, setCustName] = useState('')
    const [subTotal, setSubTotal] = useState(0)
    const [totalGst, setTotalGst] = useState(0)
    const [date, setDate] = useState(null)
    const [gstFromat, setGstFormat] = useState('a4')
    const [companyDetails, setCompanyDetails] = useState({

    })
    const { id } = useParams()
    // console.log(id)
    useEffect(() => {
        loadCompanyDetails()
        loadInvoiceDetails()


    }, [])
    const loadCompanyDetails = async () => {
        try {
            const companyDetail = await axios.post(`${BASE_URL}/company/companyByNameEmail`,
                {
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                    email: JSON.parse(localStorage.getItem('login')).user

                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                })
            setCompanyDetails(companyDetail.data)
            setInvoicePrefixArr(companyDetail.data.companyName.split(" "))
            // console.log(companyDetail.data)
        } catch (e) {
            console.log("Some Error Occurs")
        }

    }
    const loadInvoiceDetails = async () => {
        const invoiceDetail = await axios.post(`${BASE_URL}/sales/byid/${id}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            }
        )

        setInvoiceDetails(invoiceDetail.data);
        setDate(invoiceDetail.data[0].date)
        setCustName(invoiceDetail.data[0].customerName)
        let sum = 0
        let gst = 0
        invoiceDetail.data.map((item, index) => {
            sum += item.totalAmmount
            gst += item.gstInRupee
        })
        //    console.log(sum)
        setSubTotal(sum)
        setTotalGst(gst)

        const loadCustomer = async () => {
            const customerDetails = await axios.post(`${BASE_URL}/customer/bynamecompany`,
                {
                    customerName: invoiceDetail.data[0].customerName,
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                    email: JSON.parse(localStorage.getItem('login')).user
                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                }
            )
            setCustDetail(customerDetails.data)
        }
        loadCustomer()
    }


    const handleGeneratePDF = () => {
        const element = document.getElementById('invoice');

        // Specify custom options for PDF generation
        const options = {
            margin: 2,
            filename: `${custName + " " + date}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 10 },
            jsPDF: { unit: 'mm', format: `${gstFromat}`, orientation: 'portrait' }
        };

        // Generate PDF with custom options
        html2pdf()
            .from(element)
            .set(options)
            .save();
    };
    function firstCharacterString(arr) {
        // Initialize an empty string to store the result
        let result = '';

        // Iterate through the array
        arr.forEach((element) => {
            // Check if the element is a string and not empty
            if (typeof element === 'string' && element.length > 0) {
                // Append the first character of the element to the result string
                result += element.charAt(0);
            }
        });

        // Return the result string
        return result;
    }
    const selectGstInvoice=()=>{
        gst?setGst(false):setGst(true)
    }
    console.log("Inner html",gst)
    return (
        <div className='grid grid-cols-1 sm:grid-cols-4'>
            <div className="border border-gray-100 hidden sm:flex flex-col mt-5">
                <LeftSidbar />
                <RightSidebar />
                <div className='text-red-600 font-semibold'> <span className='font-bold text-lg'>Importent :-</span><br />In new Update GST number added to your Invoice If your GST is Composition it only show your gst number on invoice and if its regular it will add 18% gst to your invoice</div>

            </div>
            <div className="col-span-3 px-3 ">
                <label class="switch w-full flex justify-center h-6">
                    <input type="checkbox" onClick={selectGstInvoice} id='gstButton'/>
                    <span class="slider ml-2">GST</span>
                </label>
                <div id='invoce'>
                   
                    <div className='m-3 sm:hidden flex'><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 sm:w-10 w-44">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
                    <div className="text-center w-full ">Invoice of <span className='text-green-600 font-semibold'>{` ${custName}`} </span>on Date <span className='text-green-600 font-semibold'>{` ${date ? date.split('-')[2] + "/" + date.split('-')[1] + "/" + date.split('-')[0] : null}`}</span></div>
                    <div id='invoice' className="container mx-auto px-4 py-8  rounded-lg">

                        {/* <!-- Seller and Customer Details --> */}
                        <div className="flex justify-between mb-8">
                            <div>
                                <h1 className="text-xl font-bold">Seller:</h1>
                                <p className="text-black">{companyDetails.companyName}</p>
                                <p className="text-black">{companyDetails.companyAddress}</p>
                                {gst?<p className="text-black">GSTIn: {companyDetails.gstIn}</p>:''}
                                <p className="text-black">Mob: {companyDetails.mobile}</p>
                            </div>
                            <div className='mr-1 sm:mr-5'>
                                <h1 className="text-xl font-bold ">Customer:</h1>
                                <div>{custDetail.customerName}</div>
                                {custDetail.gstIn ? <div>GSTIn:-{custDetail.gstIn}</div> : ''}
                                <h1 className="text-xl font-bold mb-2">Address:</h1>
                                <div>{custDetail.address}</div>
                                <div className='text-center'>{custDetail.state}</div>
                            </div>
                        </div>

                        {/* <!-- Invoice Header --> */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-xl font-bold">Invoice</h1>
                                <p className="text-black">{companyDetails.companyAddress}</p>
                                <p className="text-black">Mob: {companyDetails.mobile}</p>
                                {gst?<p className="text-black">GSTIn: {companyDetails.gstIn}</p>:""}
                            </div>
                            <div className='mr-2 sm:mr-10'>
                                <p className="text-black">Invoice: {firstCharacterString(invoicePrefixArr)}-{id} </p>
                                <p className="text-black">Date :- {date ? date.split('-')[2] + "/" + date.split('-')[1] + "/" + date.split('-')[0] : null}</p>
                            </div>
                        </div>

                        {/* <!-- Table Section --> */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse pl-0 border border-blue-300">
                                <thead className="bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-4 border border-blue-300 text-center w-16">Item</th>
                                        <th className="py-2 px-4 border border-blue-300 text-center">Description</th>
                                        <th className="py-2 px-4 border border-blue-300 text-center w-16">Quantity</th>
                                        <th className="py-2 px-4 border border-blue-300 text-center">Price</th>
                                        <th className="py-2 px-4 border border-blue-300 text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {invoiceDetails.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="py-2 px-4 border border-blue-300 text-center">{index + 1}</td>
                                            <td className="py-2 px-4 border border-blue-300 text-center">{item.item.itemName}</td>
                                            <td className="py-2 px-4 border border-blue-300 text-center">{item.quantity}</td>
                                            <td className="py-2 px-4 border border-blue-300 text-center">{item.rate}</td>
                                            <td className="py-2 px-4 border border-blue-300 text-center">{item.quantity * item.rate}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>


                            </table>

                        </div>
                        {
                            companyDetails.gstType === "Regular" ? <div><div className='flex justify-end'>
                                <div style={{ width: 248 }} className='border border-blue-300 text-lg p-1 text-center'>SGST:- {totalGst / 2}</div>

                            </div>
                                <div className='flex justify-end'>
                                    <div style={{ width: 248 }} className='border border-blue-300 text-lg p-1 text-center'>SGST:- {totalGst / 2}</div>

                                </div></div> : ''
                        }
                        {/* <!-- Invoice Footer --> */}
                        <div className="mt-6">
                            {/* <p className="text-black">Subtotal: Rs. {subTotal}</p> */}
                            <p className="text-blue-900 font-bold text-lg"> Sub-total:Rs. {companyDetails.gstType === "Regular" ? subTotal - totalGst : subTotal}</p>
                            <p className="text-blue-900 font-bold text-xl">Total:Rs. {subTotal}</p>

                        </div>
                        <div className='flex justify-between mt-4'>
                            <div className='ml-2'>
                                <div className='mt-3 ml-2'>Stamp :-</div>
                                <div className="box h-16 w-40 border border-blue-300 mt-2 rounded-lg"></div>
                            </div>
                            <div className='mr-2'>
                                <div className='mt-3 ml-2'>Signature :-</div>
                                <div className="box h-16 w-40 border border-blue-300 mt-2 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="mt-6 w-full font-semibold tetx-blue-400 text-center">Thank For Shopping With {companyDetails.companyName}</div>
                    </div>
                    <div className="text-center w-full my-2">  <button className='border border-x-2 bg-green-300 rounded-lg p-2 font-semibold hover:bg-green-600 hover:shadow-lg hover:text-white transition-all ' onClick={(e) => handleGeneratePDF(e)}>Download Invoice in PDF</button></div>
                </div>
            </div>

        </div>
    )
}

export default Invoice
