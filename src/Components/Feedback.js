import React, { useState } from 'react';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import { BASE_URL } from './AuthContext';
const Feedback = () => {
    const [info,setInfo]=useState(false)
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState({
        name: JSON.parse(localStorage.getItem('login')).user,
        rating: 0,
        review: ''
    })

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        setFeedback({
            ...feedback,
            rating: selectedRating
        });
    };

    const handleReviewChange = (event) => {
        setFeedback({
            ...feedback,
            [event.target.name]: event.target.value
        });
    };
    const handleOnClick = async (e) => {
        setInfo(true)
        e.preventDefault()
        const response = await axios.post(`${BASE_URL}/sales/feedback`, feedback, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('login')).token}`
            }
        })
        
       
        document.getElementById('info').innerHTML = response.data;
        document.getElementById('info').classList.add('p-2')
        setFeedback({
            name: JSON.parse(localStorage.getItem('login')).user,
            review: ''

        })
        setRating(0)
        setTimeout(()=>{
            setInfo(false)
            document.getElementById('info').classList.remove('p-2')
        },3000)
    }

    return (
        <div className='sm:h-[33.4rem] h-[50rem]'>
             <div className='m-3 '><NavLink to={`/dashboard/${JSON.parse(localStorage.getItem('companyName')).companyName}`} className=" hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 w-44  sm:w-10">{localStorage.getItem('login') ? "⇐ Company Dashboard" : "Home"}</NavLink></div>
   
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-9">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Leave your Feedback</h2>
                <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, index) => (
                        <button
                            key={index}
                            className={`text-5xl ${rating >= index + 1 ? 'text-yellow-500' : 'text-gray-400'
                                } focus:outline-none`}
                            onClick={() => handleStarClick(index + 1)}
                        >
                            ★
                        </button>
                    ))}
                </div>
                <textarea
                    className="w-full h-32 px-4 py-2 mb-4 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300 placeholder-gray-400"
                    placeholder="Write your review..."
                    value={feedback.review}
                    name='review'
                    onChange={handleReviewChange}
                ></textarea>
                <button onClick={(e) => handleOnClick(e)} disabled={rating>0?false:true} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                    Submit Feedback
                </button>
            </div>
          <div className='text-green-600 m-3 text-xl font-semibold text-center'> {info? <span className='bg-green-600 rounded-md text-white' id='info'></span>:''}</div>
        </div>
    );
};

export default Feedback;
