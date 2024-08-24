import React, { useState } from 'react'
import axios from 'axios'
import logo from './favicon.png'
import loader from './loader.gif'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './AuthContext'

function Licence() {
  const [month, setMonth] = useState(350)
  const navigate =useNavigate()
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState(30)
  const updatePaymentOnServer = async (orderId, status,days) => {
   try{
    const response = await axios.post(`${BASE_URL}/auth/updateOrder`, {
      order_id: orderId,
      status: status,
      days:days,
      email:JSON.parse(localStorage.getItem('login')).user
    })
   }catch(error){

   }
    
  }
  const handelClickMonth = () => {
    setDays(30)
    setMonth(350)
    document.getElementById("time").innerHTML = "/mo"
    document.getElementById('m').classList.add("bg-blue-500")
    document.getElementById('m').classList.add("text-white")
    document.getElementById('q').classList.remove("bg-blue-500")
    document.getElementById('h').classList.remove("bg-blue-500")
    document.getElementById('y').classList.remove("bg-blue-500")
    document.getElementById('q').classList.remove("text-white")
    document.getElementById('h').classList.remove("text-white")
    document.getElementById('y').classList.remove("text-white")
    document.getElementById('q').classList.add("text-gray-800")
    document.getElementById('h').classList.add("text-gray-800")
    document.getElementById('y').classList.add("text-gray-800")
  }
  const handelClickQuarter = () => {
    setDays(90)
    setMonth(350 * 3)
    document.getElementById("time").innerHTML = "/quarter"
    document.getElementById('q').classList.add("bg-blue-500")
    document.getElementById('q').classList.add("text-white")
    document.getElementById('m').classList.remove("bg-blue-500")
    document.getElementById('h').classList.remove("bg-blue-500")
    document.getElementById('y').classList.remove("bg-blue-500")
    document.getElementById('m').classList.remove("text-white")
    document.getElementById('h').classList.remove("text-white")
    document.getElementById('y').classList.remove("text-white")
    document.getElementById('m').classList.add("text-gray-800")
    document.getElementById('h').classList.add("text-gray-800")
    document.getElementById('y').classList.add("text-gray-800")
  }
  const handelClickhalf = () => {
    setMonth(350 * 6)
    setDays(180)
    document.getElementById("time").innerHTML = "/halfyearly"
    document.getElementById('h').classList.add("bg-blue-500")
    document.getElementById('h').classList.add("text-white")
    document.getElementById('q').classList.remove("bg-blue-500")
    document.getElementById('m').classList.remove("bg-blue-500")
    document.getElementById('y').classList.remove("bg-blue-500")
    document.getElementById('q').classList.remove("text-white")
    document.getElementById('m').classList.remove("text-white")
    document.getElementById('y').classList.remove("text-white")
    document.getElementById('q').classList.add("text-gray-800")
    document.getElementById('m').classList.add("text-gray-800")
    document.getElementById('y').classList.add("text-gray-800")
  }
  const handelClickYear = () => {
    setDays(360)
    setMonth(350 * 12)
    document.getElementById("time").innerHTML = "/yearly"
    document.getElementById('y').classList.add("bg-blue-500")
    document.getElementById('y').classList.add("text-white")
    document.getElementById('q').classList.remove("bg-blue-500")
    document.getElementById('h').classList.remove("bg-blue-500")
    document.getElementById('m').classList.remove("bg-blue-500")
    document.getElementById('q').classList.remove("text-white")
    document.getElementById('h').classList.remove("text-white")
    document.getElementById('m').classList.remove("text-white")
    document.getElementById('q').classList.add("text-gray-800")
    document.getElementById('h').classList.add("text-gray-800")
    document.getElementById('m').classList.add("text-gray-800")
  }

  const handleOnSubmit = (e) => {
    // setLoading(true)
    e.preventDefault();

    if (localStorage.getItem('login')) {

      axios.post(`${BASE_URL}/auth/create_order`, {
        amount: month,
        info: "Order_request",
        email: JSON.parse(localStorage.getItem('login')).user
      })
        .then(response => {
          console.log("Payment initiated. month:", month);

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
              month: response.data.month, // month in smallest currency unit (e.g., paisa)
              currency: 'INR',
              order_id: response.data.id,
              name: 'TradeMate',
              description: 'Payment for Product/Service',
              image: logo, // URL to your company logo
              handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature)
                console.log("Response is :-", response)
                updatePaymentOnServer(response.razorpay_order_id, "paid",days);
                Swal.fire({
                  title: 'success',
                  text: 'Your Payment succesful !',
                  icon: 'success',
                  confirmButtonText: 'Done'
                }).then((resp)=>{
                  if(resp.isConfirmed){
                    navigate("/usersDashboard")
                  }
                })
              },
              prefill: {
                name: JSON.parse(localStorage.getItem('login')).user,
                email: JSON.parse(localStorage.getItem('login')).user,
                contact: JSON.parse(localStorage.getItem('login')).user
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
              updatePaymentOnServer(response.razorpay_order_id, "Failed");
              Swal.fire({
                title: 'Error!',
                text: 'Payment Failed Try Again !',
                icon: 'error',
                confirmButtonText: 'close'
              })
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

    }
    else {
      document.getElementById("logininfo").innerHTML = "PLease login First then checkout"
    }
    // setLoading(false)
  };
  console.log("Days=:-", days)
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Pricing</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-500">TradeMate Premium for preimium services</p>
            <div className="flex mx-auto border-2 border-blue-500 rounded overflow-hidden mt-6">
              <button id='m' onClick={handelClickMonth} className="py-1 px-4 bg-blue-500 text-white focus:outline-none border border-blue-500">Monthly</button>
              <button id='q' onClick={handelClickQuarter} className="py-1 px-4 focus:outline-none border border-blue-500">Quaterly</button>
              <button id='h' onClick={handelClickhalf} className="py-1 px-4 focus:outline-none border border-blue-500">Half yearly</button>
              <button id='y' onClick={handelClickYear} className="py-1 px-4 focus:outline-none border border-blue-500">Annually</button>
            </div>
            {loading ? <div className='flex justify-center mt-10'><img src={loader} alt="" /></div> : ""}

          </div>
          <div id="logininfo" className='text-green-800 font-bold  flex justify-center mb-2'></div>
          <div className="flex flex-wrap -m-4 justify-center">

            <div className="p-4 xl:w-1/4 md:w-1/2 w-full mb-4">
              <div className="h-full p-6 rounded-lg border-2 border-blue-500 flex flex-col relative overflow-hidden">
                <span className="bg-blue-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">POPULAR</span>
                <h2 className="text-sm tracking-widest title-font mb-1 font-medium">PRO</h2>
                <h1 className="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                  <span id='price'>₹{month}</span>
                  <span id='time' className="text-lg ml-1 font-normal text-gray-500">/mo</span>
                </h1>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>Record Daily Activities
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>Monthly And Daily Report
                </p>
                <p className="flex items-center text-gray-600 mb-2">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>One Click Invoice Generation
                </p>
                <p className="flex items-center text-gray-600 mb-6">
                  <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" className="w-3 h-3" viewBox="0 0 24 24">
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>Send Whatsapp Notification
                </p>
                <button onClick={(e) => handleOnSubmit(e)} className="flex items-center mt-auto text-white bg-blue-500 border-0 py-2 px-4 w-full focus:outline-none hover:bg-blue-600 rounded">Buy Now
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
                {/* <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p> */}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Licence
