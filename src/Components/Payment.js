import React, { useState } from 'react'
import axios from 'axios'
import logo from './favicon.png'
import { BASE_URL } from './AuthContext'
// import Razorpay from 'razorpay'

function Payment() {
    const [amount, setAmount] = useState(0)
    const handleOnChnage = (e) => {
        setAmount(e.target.value)
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/auth/create_order`, {
            amount: amount,
            info: "Order_request"
        })
            .then(response => {
                console.log("Payment initiated. Amount:", amount);

                if (response.data.status === "created") {
                    console.log(response.data);

                    const razorpay = new window.Razorpay({
                        key: 'rzp_test_daKBtgff3GpV4I', // Your Razorpay API key
                        currency: 'INR',
                    });

                    razorpay.once('payment.failed', function (response) {
                        console.error('Payment failed:', response.error);
                        // Display user-friendly error message or handle the failure
                    });

                    razorpay.once('payment.success', function (response) {
                        console.log('Payment successful:', response);
                        // Handle successful payment (e.g., update UI, redirect user)
                    });

                    let options = {
                        amount: response.data.amount, // Amount in smallest currency unit (e.g., paisa)
                        currency: 'INR',
                        order_id: response.data.id,
                        name: 'TradeMate',
                        description: 'Payment for Product/Service',
                        image: logo, // URL to your company logo
                        handler: function (response) {
                            console.log(response.razorpay_payment_id);
                            console.log(response.razorpay_order_id);
                            console.log(response.razorpay_signature)
                            alert("Payment succesfull !!")
                        },
                        prefill: {
                            name: "",
                            email: "",
                            contact: ""
                        },
                        "notes": {
                            "address": "TradeMate-Simplifying business management"

                        },
                        "theme": {
                            "color": "#3399cc"
                        }

                    };


                    // Create a new instance of Razorpay and then call open()
                    const rzpInstance = new window.Razorpay(options);
                    rzpInstance.open();
                    rzpInstance.on("payment.failed", function (response) {
                        console.log(response.error.code);
                        console.log(response.error.description);
                        console.log(response.error.source);
                        console.log(response.error.step);
                        console.log(response.error.reason);
                        console.log(response.error.metadata.order_id);
                        console.log(response.error.metadata.payment_id);
                        alert("Payment failed try again")
                    })

                } else {
                    console.error('Failed to create payment order:', response.data);
                    // Display user-friendly error message or handle the failure
                }
            })
            .catch(error => {
                console.error('Error occurred while creating payment order:', error);
                // Display user-friendly error message or handle the failure
            });
    };



    return (
        <div className='flex flex-col items-center'>
            <span className='text-2xl text-green-600 font-bold'> Payment Page </span>
            <form className='border border-gray-500 shadow-lg rounded-lg p-2 h-80 flex flex-col items-center' onSubmit={(e) => handleOnSubmit(e)} onChange={(e) => handleOnChnage(e)}>
                <label htmlFor="ammount" className='my-2 font-semibold'>Your ammount</label>
                <input type="number" min="10" className='border border-green-500 my-2 rounded-md p-1' id='amount' />
                <button className='border border-green-400 rounded-lg p-2 hover:bg-green-600 hover:text-white hover:shadow-xl'>Pay Now</button>
                {/* <label htmlFor="ammount" className='my-2 font-semibold'>Your ammount</label>
                <input type="number" min="0" className='border border-green-500 my-2 rounded-md p-1' /> */}
            </form>
        </div>
    )
}

export default Payment
