import React, { useState } from 'react';
import axios from 'axios'
import { BASE_URL } from './AuthContext';

function UpdateCompany(props) {
    const [formData, setFormData] = useState({
        companyId: props.id,
        companyName: '',
        companyAddress: '',
        gstIn: '',
        gstType: '',
        pinCode: '',
        mobile: '',
        state:'',
        country:''

    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            email: JSON.parse(localStorage.getItem('login')).user
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${BASE_URL}/company/update`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
                }
            }).then((resp) => {
                if (resp) {
                    props.setOnlyUpdate(false)
                    props.myfunction();
                }
            })

    };
    const hanldeRadioChange = (e) => {
        setFormData({
            ...formData,
            gstType: e.target.value
        })
    }
    return (
        <div className="p-4 rounded-md z-10">
            <div className='w-full text-green-600 text-center text-xl font-bold'> Update your Company</div>
            <form onSubmit={handleSubmit} className="space-y-6">

                {/* <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-blue-700">Company Name</label>
                        <input id="companyName" name="companyName" type="text" value={formData.companyName} onChange={handleChange}  className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                        </input>
                    </div> */}
                <div>
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-blue-700">Company Address</label>
                    <input id="companyAddress" name="companyAddress" type="text" value={formData.companyAddress} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                    </input>
                </div>


                <div>
                    <label htmlFor="gstIn" className="block text-sm font-medium text-blue-700">GSTIN</label>
                    <input id="gstIn" name="gstIn" type="text" value={formData.gstIn} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                    </input>
                </div>
                <div className='flex justify-around'>
                    <div className='mt-6'>GST Type :-</div>
                    <div className='sm:mt-4'>
                        <label className="block">
                            <input type="radio" onChange={(e) => hanldeRadioChange(e)} name="option" value="Regular" className="mr-1" />
                            Regular
                        </label>
                        <label className="block">
                            <input type="radio" onChange={(e) => hanldeRadioChange(e)} name="option" value="Composition" className="mr-1" />
                            Composition
                        </label>
                    </div>
                </div>
                <div className='flex justify-around'>
                    <div>
                        <label htmlFor="pinCode" className="block text-sm font-medium text-blue-700">Pin Code</label>
                        <input id="pinCode" name="pinCode" type="number" value={formData.pinCode} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                        </input>
                    </div>
                    <div className='ml-2'>
                        <label htmlFor="mobile" className="block text-sm font-medium text-blue-700">Mobile</label>
                        <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            pattern="[0-9]{10}"  // Set the pattern attribute to allow only 10 digits
                            maxLength="10"       // Set the maxLength attribute to limit input to 10 characters
                            value={formData.mobile}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black"
                            placeholder="Enter 10-digit mobile number"  // Add a placeholder for user guidance
                        // Add the required attribute to make the input field mandatory
                        />
                    </div>

                </div>
                <div className='w-full flex justify-around'>
                    <div className='m-1'>
                        <label htmlFor="gstType" className="block text-sm font-medium text-blue-700">State</label>
                        <input id="gstType" name="state" type="text" value={formData.state} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                        </input>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="gstType" className="block text-sm font-medium text-blue-700">Country</label>
                        <input id="gstType" name="country" type="text" value={formData.country} onChange={handleChange} className="mt-1 p-2 w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block border border-black">
                        </input>
                    </div>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCompany
