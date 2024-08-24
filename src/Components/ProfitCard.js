// ProfitCard.js

import React from 'react';

const ProfitCard = ({ title, amount }) => {
    // Conditionally apply text color based on the title
    const textColor = title.includes("Remaining") ? "text-red-600" : "text-green-600";

    return (
        <div className='flex flex-col w-60 h-40 m-2 border border-green-600 rounded-xl shadow-lg'>
            <div className={`font-bold border border-x-2 h-10 flex justify-center items-center shadow-lg w-full rounded-xl ${textColor}`}>{title}</div>
            <div className={`flex justify-center m-6 font-bold text-3xl ${textColor}`}>₹ {amount}</div>
        </div>
    );
};

export default ProfitCard;
