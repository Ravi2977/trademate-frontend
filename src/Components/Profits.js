import React, { useEffect, useState } from 'react';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import axios from 'axios';
import ProfitCard from './ProfitCard';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from './AuthContext';



function Profits() {
    const [profitData, setProfitData] = useState({});
    const [yearlyData, setYearlyData] = useState({});
    const [allReport, setAllReport] = useState({});
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth() + 1;
    const currentYear = todayDate.getFullYear();
    const currentDate = todayDate.getDate();
    const [minYear, setMinYear] = useState(0)
    const [year, setYear] = useState(currentYear)
    const [regMonth, setRegMonth] = useState()
    const [cardYear,setCardYear]=useState(currentYear)
    const [cardMonth,setCardMonth]=useState(currentMonth)
    const [dateState, setDateState] = useState({
        year: currentYear,
        month: currentMonth,
        day: currentDate,
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
        email: JSON.parse(localStorage.getItem('login')).user
    });
    const selectValue = () => {
        var selectedYear = document.getElementById('year').value
        var selectRegMonth = document.getElementById('regMonth') ? document.getElementById('regMonth').value : currentMonth
        setYear(selectedYear)
        setDateState({
            year: selectedYear,
            month: selectRegMonth,
            day: currentDate,
            companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
            email: JSON.parse(localStorage.getItem('login')).user
        })
        loadData()
        loadAllReport()
        loadYearData()

    }
    const monthInLetter = changeNumberToMonth(currentMonth);
    function changeNumberToMonth(currentMonth) {
        let month = "";
        switch (currentMonth) {
            case 1:
                month = "January";
                break;
            case 2:
                month = "February";
                break;
            case 3:
                month = "March";
                break;
            case 4:
                month = "April";
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
                month = "August";
                break;
            case 9:
                month = "September";
                break;
            case 10:
                month = "October";
                break;
            case 11:
                month = "November";
                break;
            case 12:
                month = "December";
                break;
            default:
                month = null;
        }
        return month;
    }

    useEffect(() => {
        loadData();
        loadYearData();
        loadAllReport();
        loadMinYear()
    }, [], dateState);
    let yearsList = []
    for (let yr = currentYear; yr >= minYear; yr--) {
        yearsList.push(yr)
    }
    const loadMinYear = async () => {
        try {
            const minYearValue = await axios.post(`${BASE_URL}/sales/date`,
                {
                    companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                    email: JSON.parse(localStorage.getItem('login')).user
                },
                {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
                    }
                })
            setMinYear(parseInt(minYearValue.data.split('-')[0]))
        } catch (e) {
            console.log("Some error Occurs")
        }
    }
    const loadData = async () => {
        // console.log("Date state ", dateState)
        try {
            const profits = await axios.post(
                `${BASE_URL}/sales/profit`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setProfitData(profits.data);
            // console.log("Profits data", profits.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const loadYearData = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/sales/byyear`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setYearlyData(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadAllReport = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/sales/totalsum`,
                dateState,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );
            setAllReport(response.data);
        } catch (error) {
            console.log("Something went wrong");
        }
    }
    const loadSelectedGst = () => {
        // console.log("Clicked on by month and year")
        setCardMonth(dateState.month)
        setCardYear(dateState.year)
       
        loadData()
        loadAllReport()
        loadYearData()
    }
    
    return (
        <div>
            <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md sm:hidden flex px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 w-44  sm:w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
            <div>
                <h1 className='flex justify-center text-3xl font-bold text-indigo-700'>Profits</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddcustomer="bold" />
                    <RightSidebar />
                </div>
                <div className='border border-indigo-900 rounded-lg p-4 col-span-3'>
                    <div className='mt-8 sm:flex justify-center flex-col  items-center'>
                        <div className='w-full sm:flex sm:justify-center'>
                            <div className='mx-4 sm:mx-8 mb-4 sm:mb-0 sm:w-1/4'>
                                <label className='font-bold rounded-lg w-full text-blue-600' htmlFor="Year">Select Year</label>
                                <select onChange={selectValue} name="quarter" className='border border-blue-600 p-2 rounded-lg w-full' id="year">
                                    {yearsList.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mx-4 sm:mx-8 mb-4 sm:mb-0 sm:w-1/4' >
                                <label className='font-bold rounded-lg w-full text-blue-600' htmlFor="Month">Select Month</label>
                                <select onChange={selectValue} name="regMonth" className='border border-blue-600 p-2 rounded-lg w-full' id="regMonth">
                                    <option value="1" {...currentMonth === 1 ? 'selected' : ''}>January</option>
                                    <option value="2" disabled={currentMonth < 2 && currentYear === parseInt(year)} {...currentMonth === 2 ? 'selected' : ''}>February</option>
                                    <option value="3" disabled={currentMonth < 3 && currentYear === parseInt(year)} {...currentMonth === 3 ? 'selected' : ''}>March</option>
                                    <option value="4" disabled={currentMonth < 4 && currentYear === parseInt(year)} {...currentMonth === 4 ? 'selected' : ''}>April</option>
                                    <option value="5" disabled={currentMonth < 5 && currentYear === parseInt(year)} {...currentMonth === 5 ? 'selected' : ''}>May</option>
                                    <option value="6" disabled={currentMonth < 6 && currentYear === parseInt(year)} {...currentMonth === 6 ? 'selected' : ''}>June</option>
                                    <option value="7" disabled={currentMonth < 7 && currentYear === parseInt(year)} {...currentMonth === 7 ? 'selected' : ''}>July</option>
                                    <option value="8" disabled={currentMonth < 8 && currentYear === parseInt(year)} {...currentMonth === 8 ? 'selected' : ''}>August</option>
                                    <option value="9" disabled={currentMonth < 9 && currentYear === parseInt(year)} {...currentMonth === 9 ? 'selected' : ''}>September</option>
                                    <option value="10" disabled={currentMonth < 10 && currentYear === parseInt(year)} {...currentMonth === 10 ? 'selected' : ''}>October</option>
                                    <option value="11" disabled={currentMonth < 11 && currentYear === parseInt(year)} {...currentMonth === 11 ? 'selected' : ''}>November</option>
                                    <option value="12" disabled={currentMonth < 12 && currentYear === parseInt(year)} {...currentMonth === 12 ? 'selected' : ''}>December</option>
                                </select>
                            </div>
                        </div>
                        <button className="border border-blue-600 mt-6 p-2 rounded-lg text-center w-1/2 sm:w-auto bg-blue-400 text-white hover:bg-blue-600 mb-1" onClick={loadSelectedGst}>Click to get Selected Value</button>
                    </div>
                    <div className='bg-indigo-700 text-white rounded-md text-center py-2'>{`${changeNumberToMonth(parseInt(cardMonth))}, ${cardYear} Report`}</div>
                    <div className='flex flex-wrap justify-center'>
                        <ProfitCard title={`Profit in ${changeNumberToMonth(parseInt(cardMonth))}`} amount={profitData.sumOfProfit?profitData.sumOfProfit:"No data"} />
                        <ProfitCard title={`Revenue in ${changeNumberToMonth(parseInt(cardMonth))}`} amount={profitData.sumOfTotalAmmount?profitData.sumOfTotalAmmount:"No Data"} />
                        <ProfitCard title={`Remaining in ${changeNumberToMonth(parseInt(cardMonth))}`} amount={profitData.sumOfRemaining?profitData.sumOfRemaining:"No Data"} />
                    </div>
                    <div className='bg-indigo-700 text-white rounded-md text-center py-2 mt-4'>{`${cardYear} Report`}</div>
                    <div className='flex flex-wrap justify-center'>
                        <ProfitCard title={`Profit in ${cardYear}`} amount={yearlyData.sumOfProfit} />
                        <ProfitCard title={`Revenue in ${cardYear}`} amount={yearlyData.sumOfTotalAmmount} />
                        <ProfitCard title={`Remaining in ${cardYear}`} amount={yearlyData.sumOfRemaining} />
                    </div>
                    <div className='bg-indigo-700 text-white rounded-md text-center py-2 mt-4'>All Time Report</div>
                    <div className='flex flex-wrap justify-center'>
                        <ProfitCard title="Total Profit" amount={allReport.sumOfProfit} />
                        <ProfitCard title="Total Revenue" amount={allReport.sumOfTotalAmmount} />
                        <ProfitCard title="Total Remaining" amount={allReport.sumOfRemaining} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profits;
