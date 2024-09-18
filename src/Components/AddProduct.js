import React, { useEffect, useState } from 'react';
import LeftSidbar from './LeftSidbar';
import RightSidebar from './RightSidebar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import loder from './loader.gif';
import { BASE_URL } from './AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadUser();
        loadProducts();
    }, []);

    const [id, setId] = useState(0);
    const [email, setEmail] = useState({
        email: JSON.parse(localStorage.getItem('login')).user,
    });

    const [itemDetail, setItemDetail] = useState({
        itemName: '',
        purchasePrice: 0,
        quantity: 0,
        gstInPercent: 0,
        companyName: JSON.parse(localStorage.getItem('companyName')).companyName,
        email: JSON.parse(localStorage.getItem('login')).user,
        company: {
            companyId: 0,
        },
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setItemDetail((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const loadProducts = async () => {
        try {
            const productDetails = await axios.post(
                `${BASE_URL}/stock/all`,
                {
                    companyName: itemDetail.companyName,
                    email: itemDetail.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem('login')
                                ? JSON.parse(localStorage.getItem('login')).token
                                : ''
                        }`,
                    },
                }
            );
            localStorage.setItem('saleDetails', JSON.stringify(productDetails.data));
        } catch (error) {
            toast.error("Failed to load products");
        }
    };

    const handleOnSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/stock/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        localStorage.getItem('login')
                            ? JSON.parse(localStorage.getItem('login')).token
                            : ''
                    }`,
                },
                body: JSON.stringify(itemDetail),
            });

            if (!response.ok) {
                throw new Error('Failed to add stock item');
            }

            await loadProducts();
            setItemDetail({
                itemName: '',
                purchasePrice: 0,
                quantity: 0,
                gstInPercent: 0,
                companyName: itemDetail.companyName,
                email: itemDetail.email,
                company: {
                    companyId: 0,
                },
            });

            toast.success("Product added successfully");
        } catch (error) {
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    const loadUser = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/byemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${
                        localStorage.getItem('login')
                            ? JSON.parse(localStorage.getItem('login')).token
                            : ''
                    }`,
                },
                body: JSON.stringify(email),
            });

            if (!response.ok) {
                throw new Error('Failed to load user');
            }

            const result = await response.json();
            setId(result.id);
        } catch (error) {
            toast.error("Failed to load user");
        }
    };

    return (
        <div className="my-3 h-[45.4rem] sm:h-[41.7rem]">
            <div className="m-3">
                <NavLink
                    to={`/dashboard/${itemDetail.companyName}`}
                    className="hover:bg-blue-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium bg-blue-800 text-white border border-gray-200 sm:w-10 w-44 sm:hidden flex"
                >
                    {localStorage.getItem('login') ? '⇐ Company Dashboard' : 'Home'}
                </NavLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4">
                <div className="border border-gray-100 hidden sm:flex flex-col">
                    <LeftSidbar openaddProduct="bold" />
                    <RightSidebar />
                </div>
                <div className="border border-gray-100 justify-center col-span-3">
                    <div className="p-10">
                        <h1 className="flex justify-center text-3xl font-bold text-green-900">
                            Add new Product
                        </h1>
                    </div>
                    <form
                        className="space-y-6 px-4 lg:px-60 py-2"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="w-full text-center p-2 border border-red-400 rounded-md shadow-sm">
                            <span className="font-bold text-red-500">Important!</span> Product Name Format Exp:- if Product is Mouse And Brand is Dell this Name should be{' '}
                            <span className="text-blue-600 underline font-bold">Mouse-Dell</span>
                        </div>

                        <div>
                            <label
                                htmlFor="Item Name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Enter Product name
                            </label>
                            <input
                                id="itemName"
                                value={itemDetail.itemName}
                                onChange={handleOnChange}
                                name="itemName"
                                type="text"
                                required
                                className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Purchase Price in Rs.
                            </label>
                            <div className="mt-2">
                                <input
                                    id="price"
                                    value={itemDetail.purchasePrice}
                                    onChange={handleOnChange}
                                    name="purchasePrice"
                                    type="number"
                                    min="0"
                                    required
                                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Quantity
                            </label>
                            <div className="mt-2">
                                <input
                                    id="quantity"
                                    value={itemDetail.quantity}
                                    onChange={handleOnChange}
                                    name="quantity"
                                    type="number"
                                    min="0"
                                    required
                                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="gstInPercent"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Gst %
                            </label>
                            <div className="mt-2">
                                <input
                                    id="gstInPercent"
                                    value={itemDetail.gstInPercent}
                                    onChange={handleOnChange}
                                    name="gstInPercent"
                                    type="number"
                                    min="0"
                                    required
                                    className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="flex w-[10rem] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {loading ? (
                                    <div>
                                        <img
                                            className="w-6 rounded-full"
                                            src={loder}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    'Add Product'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;
