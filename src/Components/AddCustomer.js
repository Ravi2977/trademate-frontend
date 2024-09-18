import React, { useState } from 'react';
import LeftSidebar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import { NavLink } from 'react-router-dom';
import loader from './loader.gif';
import { BASE_URL } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCustomer() {
  const [loading, setLoading] = useState(false);
  const companyName = JSON.parse(localStorage.getItem('companyName'))?.companyName || '';
  const userEmail = JSON.parse(localStorage.getItem('login'))?.user || '';
  const authToken = JSON.parse(localStorage.getItem('login'))?.token || '';

  const [customerDetails, setCustomerDetails] = useState({
    customerName: '',
    address: '',
    companyName: companyName,
    state: '',
    country: '',
    pinCode: '',
    gstIn: '',
    gstType: '',
    mobile: '',
    email: userEmail,
    company: {
      companyId: 0,
    },
  });

  const handleOnChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRadioButton = (e) => {
    setCustomerDetails({
      ...customerDetails,
      gstType: e.target.value,
    });
  };

  const validateInputs = () => {
    const {
      customerName,
      address,
      state,
      country,
      pinCode,
      mobile,
    } = customerDetails;

    if (
      !customerName ||
      !address ||
      !state ||
      !country ||
      !pinCode ||
      !mobile
    ) {
      toast.error('Please fill in all required fields.');
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error('Mobile number must be 10 digits.');
      return false;
    }

    if (!/^\d{6}$/.test(pinCode)) {
      toast.error('Pin Code must be 6 digits.');
      return false;
    }

    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/customer/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(customerDetails),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Customer added successfully!');
        setCustomerDetails({
          customerName: '',
          address: '',
          companyName: companyName,
          state: '',
          country: '',
          pinCode: '',
          gstIn: '',
          gstType: '',
          mobile: '',
          email: userEmail,
          company: {
            companyId: 0,
          },
        });
      } else {
        const errorMessage = data.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server not responding. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 sm:h-auto">
      <div className="m-3">
        <NavLink
          to={`/dashboard/${companyName}`}
          className="hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200"
        >
          {localStorage.getItem('login') ? '⇐ Company Dashboard' : 'Home'}
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="border border-gray-100 hidden sm:flex flex-col">
          <LeftSidebar openaddcustomer="bold" />
          <RightSidebar />
        </div>

        <div className="border border-gray-100 col-span-1 sm:col-span-3 w-full p-6">
          <h1 className="flex justify-center text-3xl font-bold text-green-600 mb-6">
            Add New Customer
          </h1>

          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Customer Name
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  value={customerDetails.customerName}
                  onChange={handleOnChange}
                  required
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter customer's name"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={customerDetails.address}
                  onChange={handleOnChange}
                  required
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter address"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  value={customerDetails.state}
                  onChange={handleOnChange}
                  required
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter state"
                />
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={customerDetails.country}
                  onChange={handleOnChange}
                  required
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter country"
                />
              </div>

              {/* GSTIN */}
              <div>
                <label
                  htmlFor="gstIn"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  GSTIN (Optional)
                </label>
                <input
                  id="gstIn"
                  name="gstIn"
                  type="text"
                  value={customerDetails.gstIn}
                  onChange={handleOnChange}
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter GSTIN"
                />
              </div>

              {/* GST Type */}
              <div>
                <span className="block text-sm font-medium leading-6 text-gray-900">
                  GST Type (Optional)
                </span>
                <div className="mt-2 flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gstType"
                      value="Regular"
                      checked={customerDetails.gstType === 'Regular'}
                      onChange={handleRadioButton}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Regular</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gstType"
                      value="Composition"
                      checked={customerDetails.gstType === 'Composition'}
                      onChange={handleRadioButton}
                      className="form-radio h-4 w-4 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Composition</span>
                  </label>
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mobile
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={customerDetails.mobile}
                  onChange={handleOnChange}
                  required
                  pattern="\d{10}"
                  maxLength="10"
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              {/* Pin Code */}
              <div>
                <label
                  htmlFor="pinCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Pin Code
                </label>
                <input
                  id="pinCode"
                  name="pinCode"
                  type="text"
                  value={customerDetails.pinCode}
                  onChange={handleOnChange}
                  required
                  pattern="\d{6}"
                  maxLength="6"
                  className="mt-1 block w-full rounded-md p-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter 6-digit pin code"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-40 flex justify-center items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? (
                  <img className="h-6 w-6" src={loader} alt="Loading..." />
                ) : (
                  'Add Customer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
    </div>
  );
}

export default AddCustomer;
