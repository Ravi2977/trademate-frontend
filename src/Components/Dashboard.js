import React, { useEffect, useState } from 'react';
import Navigationbuttons from './Navigationbuttons';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import Home from './Home';
import LoginSuggetion from './LoginSuggetion';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from './AuthContext';

function Dashboard() {
    let store = JSON.parse(localStorage.getItem('login'));
    const [subscription, setSubscription] = useState(true)
    const [loadedUser, setLoadedUser] = useState({

    })
    const [expired, setExpired] = useState(false)

    useEffect(() => {
        loadProducts();
        loadCustomers();
        loadSeller();
        loadUser();
    }, []);
    const loadUser = async () => {
        try {
            // Make the Axios POST request
            const loadedUser = await axios.get(
                `${BASE_URL}/user/byemail/${JSON.parse(localStorage.getItem('login')).user}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                    }
                }
            );

            // Log the data returned by the server
            setLoadedUser(loadedUser.data)
            if (loadedUser.data.remainingDays > 15) {
                setSubscription(true)

            } else if (loadedUser.data.remainingDays <= 0) {
                setSubscription(false)
                setExpired(true)
                document.getElementById("subs").innerHTML = `Your Licence is Expired on ${loadedUser.data.expDate} Buy Licence Go to pricing page`
            }
            else {
                setSubscription(false)
                //    document.getElementById("subs").innerHTML=`Your Licence is going to be expired in ${loadedUser.data.remainingDays} Days`
            }
        } catch (error) {
            // Handle errors
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with status code:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Error while setting up the request:', error.message);
            }
        }


    };

    const loadProducts = async () => {
        const productDetails = await axios.post(
            `${BASE_URL}/stock/all`,
            {
                companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
                email: JSON.parse(localStorage.getItem('login')).user
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }
        );
        localStorage.setItem('saleDetails', JSON.stringify(productDetails.data));
    };
    const loadCustomers = async () => {
        const customers = await axios.get(
            `${BASE_URL}/customer/all`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }
        );
        localStorage.setItem('customers', JSON.stringify(customers.data));
    };
    const loadSeller = async () => {
        const sellers = await axios.get(
            `${BASE_URL}/seller/all`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }
        );
        localStorage.setItem('sellers', JSON.stringify(sellers.data));
    };

    return (
        <div className="bg-white sm:h-[37.3rem] h-[70rem]">
            {expired ?
                <div className="absolute top-0 left-0 w-full sm:h-[45.5rem] h-[82.6rem] bg-black opacity-50 z-50" ></div>
                : ''}
            {expired ? <div className="absolute z-50 w-full h-32  flex justify-center mt-40" >
                <div className='bg-red-200 text-red-900 font-bold rounded-lg p-4 border border-red-500'>
                    <div className="flex  items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M17.707 2.293a1 1 0 0 1 1.414 1.414l-16 16a1 1 0 0 1-1.414-1.414l16-16zM10 16a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm.354-4.354a.5.5 0 0 1 .707.707l-2 2a.5.5 0 0 1-.707 0l-2-2a.5.5 0 1 1 .707-.707L8 13.293V7.5a.5.5 0 1 1 1 0v5.793l1.646-1.647z" />
                        </svg>
                        <div>
                            Your Licence is Expired
                            <br />
                            Please Renew it
                        </div>
                        
                    </div>
                    <NavLink to="/licence"><button  className='w-full bg-blue-400 border border-blue-600 rounded-xl p-1 mt-2'>Buy Now</button></NavLink>
                </div>

            </div> : ''}
            {store && store.login ? (
                <div>
                    <div className="mb-4 flex  justify-center items-center bg-gradient-to-r from-sky-400 to-violet-500 text-white font-semibold rounded-lg p-4 shadow-md">
                        <h1 className="text-3xl">Welcome to</h1>
                        <div className="text-white bg-blue-900 px-3 py-1 ml-4 rounded-md">
                            <span className="text-lg">{`${localStorage.getItem("login")?JSON.parse(localStorage.getItem('companyName')).companyName:""}`}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4">
                        <div className="sm:col-span-1 border border-blue-100 mb-2">
                            <LeftSidbar opendash="bold" />
                            <RightSidebar />

                        </div>

                        <div className="sm:col-span-3 ml-6 sm:ml-0 sm:border border-blue-100 sticky pr-6">
                            {subscription ? '' : <div id="subs" className='flex justify-center text-red-700 font-bold'>Your Licence will expire on  {loadedUser.expDate} <NavLink className='underline ml-1' to="/licence"> Buy Now</NavLink></div>
                            }
                            <Navigationbuttons />
                        </div>

                    </div>
                </div>
            ) : (
                <LoginSuggetion />
            )}
        </div>
    );
}

export default Dashboard;
