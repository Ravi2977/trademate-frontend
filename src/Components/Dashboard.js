import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { BASE_URL } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from './LeftSidbar';
import RightSidebar from './RightSidebar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [salesData, setSalesData] = useState([]);
    const [purchasesData, setPurchasesData] = useState([]);
    const [profitsData, setProfitsData] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchBusinessData();
        fetchRecentActivities();
        fetchNotifications();
    }, []);

    const fetchBusinessData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/business/monthly-stats`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            });
            const { sales, purchases, profits } = response.data;
            setSalesData(sales);
            setPurchasesData(purchases);
            setProfitsData(profits);
        } catch (error) {
            handleAxiosError(error, "Failed to load business data.");
        }
    };

    const fetchRecentActivities = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/business/recent-activities`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            });
            setRecentActivities(response.data);
        } catch (error) {
            handleAxiosError(error, "Failed to load recent activities.");
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/business/notifications`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            });
            setNotifications(response.data);
        } catch (error) {
            handleAxiosError(error, "Failed to load notifications.");
        }
    };

    const handleAxiosError = (error, defaultMessage) => {
        if (error.response) {
            console.error('Server responded with status code:', error.response.status);
            console.error('Response data:', error.response.data);
            toast.error(`${defaultMessage} (Server Error: ${error.response.status})`);
        } else if (error.request) {
            console.error('No response received from the server');
            toast.error(`${defaultMessage}. No response from server.`);
        } else {
            console.error('Error while setting up the request:', error.message);
            toast.error(`${defaultMessage}. Error: ${error.message}`);
        }
    };

    const chartData = {
        labels: salesData.map(data => data.month),
        datasets: [
            {
                label: 'Sales',
                data: salesData.map(data => data.amount),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
            {
                label: 'Purchases',
                data: purchasesData.map(data => data.amount),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 1,
            },
            {
                label: 'Profits',
                data: profitsData.map(data => data.amount),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex">
                <div className="w-1/4">
                    <LeftSidebar />
                    <RightSidebar />
                </div>
                <div className="w-3/4">
                    <h1 className="text-2xl font-bold mb-4">Business Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Monthly Sales</h2>
                            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } } } }}/>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Monthly Purchases</h2>
                            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } } } }}/>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-semibold mb-2">Monthly Profits</h2>
                        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } } } }}/>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
                        <ul>
                            {recentActivities.map((activity, index) => (
                                <li key={index} className="border-b py-2">{activity.description}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
            <ToastContainer />
        </div>
    );
}

export default Dashboard;
