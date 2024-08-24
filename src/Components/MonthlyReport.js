import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { NavLink, json } from 'react-router-dom';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';
function MonthlyReport() {
    const [loading, setLoading] = useState(false)
    const [currentMonthData, setCurrentMonthData] = useState({});
    const [previousMonthData, setPreviousMonthData] = useState({});
    const [dailyData, setDailyData] = useState({

    })
    const [customerList, setCustomerList] = useState({
        totalRevenue: 0,
        totalExpenses: 0,
        totalProfits: 0,
        totalRemaining: 0,
        topCustomersModel: {
            customerSaleModels: [
                {
                    customerName: "",
                    totalSale: 0
                },
                {
                    customerName: "",
                    totalSale: 0
                },
                {
                    customerName: "",
                    totalSale: 0
                }
            ]
        },
        topItemsModel: {
            topItemModelList: [
                {
                    itemName: "",
                    quantity: 0
                },
                {
                    itemName: "",
                    quantity: 0
                },
                {
                    itemName: "",
                    quantity: 0
                },
                {
                    itemName: "",
                    quantity: 0
                }
            ]
        }
    })
    const [itemList, setitemList] = useState({})
    const date = new Date();
    const currenMonth = date.getMonth() + 1;
    function changeNumberToMonth(currentMonth) {
        let month = "";
        switch (currentMonth) {
            case 0:
                month = "January";
                break;
            case 1:
                month = "February";
                break;
            case 2:
                month = "March";
                break;
            case 3:
                month = "Aprail";
                break;
            case 4:
                month = "May";
                break;
            case 5:
                month = "June";
                break;
            case 6:
                month = "July";
                break;
            case 7:
                month = "August";
                break;
            case 8:
                month = "September";
                break;
            case 9:
                month = "October";
                break;
            case 10:
                month = "November";
                break;
            case 11:
                month = "December";
                break;
            default:
                month = null;
        }
        return month;
    }
    useEffect(() => {
        loadData()
        loadPreviouseData()
        loadMonthlyData()
    }, [])
    const loadMonthlyData = async () => {
        setLoading(true)
        try {
            const data = await axios.post(`${BASE_URL}/sales/dailyReport`, {
                day: date.getDate(),
                month: currenMonth,
                year: date.getFullYear(),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                email: JSON.parse(localStorage.getItem('login')).user
            },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                });

            // Process the response data here
            setDailyData(data.data)
        } catch (error) {
            // Handle error
            console.error('Error:', error.message);
            // You can also throw the error to propagate it further if needed
            throw error;
        }
        setLoading(false)
    }



    const loadData = async () => {
        try {

            const data = await axios.post(`${BASE_URL}/sales/monthlyReport`, {
                month: currenMonth,
                year: date.getFullYear(),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                email: JSON.parse(localStorage.getItem('login')).user
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });


            setCurrentMonthData(data.data)
            setCustomerList(data.data)
            setitemList(data.data.topItemsModel)
        } catch (error) {

            console.error('Error:', error);
        }
    }
    const loadPreviouseData = async () => {
        try {

            const data = await axios.post(`${BASE_URL}/sales/monthlyReport`, {
                month: currenMonth - 1,
                year: date.getFullYear(),
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                email: JSON.parse(localStorage.getItem('login')).user
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                }
            });


            setPreviousMonthData(data.data)
        } catch (error) {

            console.error('Error:', error);
        }
    }
    console.log(customerList.topItemsModel.topItemModelList.length)
    return (
        <div className="container mx-auto p-4">
            <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 w-44  sm:w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div>
                <div className='w-full text-center text-2xl font-bold underline'>Daily Report (Today)</div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Financial Summary</h2>
                    {loading ? <div className='flex justify-center'><img src={loder} alt="" /></div> : <div className="grid grid-cols-2 gap-2">

                        <div>
                            <p className="text-gray-600">Total Revenue:</p>
                            <p className="text-gray-900">₹{dailyData.totalRevenue}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Expenses:</p>
                            <p className="text-gray-900">₹{dailyData.totalExpenses}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Net Profit:</p>
                            <p className="text-gray-900">₹{dailyData.totalProfits}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Remaining:</p>
                            <p className="text-gray-900">₹{dailyData.totalRemaining}</p>
                        </div>
                    </div>}
                </div>
            </div>
            <h1 className="text-3xl font-semibold mb-4 text-center underline mt-2">Monthly Business Report - {changeNumberToMonth(currenMonth - 1)} {date.getFullYear()}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Financial Summary</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-gray-600">Total Revenue:</p>
                            <p className="text-gray-900">₹{currentMonthData.totalRevenue}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Expenses:</p>
                            <p className="text-gray-900">₹{currentMonthData.totalExpenses}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Net Profit:</p>
                            <p className="text-gray-900">₹{currentMonthData.totalProfits}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Remaining:</p>
                            <p className="text-gray-900">₹{currentMonthData.totalRemaining}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Comparison with Previous Month {changeNumberToMonth(date.getMonth() - 1)} {date.getFullYear()}</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <p className="text-gray-600">Total Revenue :</p>
                            <p className="text-gray-900">₹{previousMonthData.totalRevenue}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Expenses :</p>
                            <p className="text-gray-900">₹{previousMonthData.totalExpenses}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Net Profit :</p>
                            <p className="text-gray-900">₹{previousMonthData.totalProfits}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Remaining :</p>
                            <p className="text-gray-900">₹{previousMonthData.totalRemaining}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-2">Sales Performance(Top selling product)</h2>
                        {
                            customerList.topItemsModel.topItemModelList.map((item, index) => (
                                index>3?'':<p key={index} className="text-gray-600">
                               {index + 1}. {item.itemName}: {item.quantity} pieces
                           </p>
                            ))
                        }
                    </div>
                    <div className=" bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold mb-2">Top Customers</h2>
                        <ul className="">
                            {
                                customerList.topCustomersModel.customerSaleModels.map((customer, index) => (
                                    index>3?'':<li key={index} className="text-gray-600 list-none">{index + 1}. {customer.customerName} : ₹{customer.totalSale}</li>
                                ))
                            }



                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MonthlyReport;
