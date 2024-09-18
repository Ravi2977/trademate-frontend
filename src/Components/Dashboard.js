import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from './LeftSidbar';
import RightSidebar from './RightSidebar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function Dashboard() {
    const [recentActivities] = useState([
        { description: 'New sale recorded: $500' },
        { description: 'Purchase order processed: $350' },
        { description: 'Profit margin increased by 5%' },
    ]);

    const [notifications] = useState([
        { message: 'New customer inquiry received' },
        { message: 'Inventory restocked' },
    ]);

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [5000, 7000, 8000, 6000, 7500, 9000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
            {
                label: 'Purchases',
                data: [3000, 4000, 5000, 3500, 4000, 5000],
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 1,
            },
            {
                label: 'Profits',
                data: [2000, 3000, 3000, 2500, 3500, 4000],
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
                
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <h2 className="text-xl font-semibold mb-2">Monthly Profits</h2>
                        <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: (context) => `${context.dataset.label}: $${context.raw}` } } } }} />
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
