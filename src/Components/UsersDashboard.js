import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import UpdateCompany from './UpdateCompany';
import crossImage from './cross.png';
import CreateCOmpany from './CreateCOmpany';
import loader from './loader.gif'
import clickEffect from './clickOnButton.wav'
import { BASE_URL } from './AuthContext';


function UsersDashboard() {
   const clickSound= new Audio(clickEffect);
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState(0);
    const [loading, setLoading]=useState(true)
    const [onlyUpdate, setOnlyUpdate] = useState(false);
    const [companyDetail, setCompanyDetail] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        loadCompany();

    }, []);


    const loadCompany = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/company/byuser/${JSON.parse(localStorage.getItem('login')).user}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}`,
                    },
                }
            );
            setCompanyDetail(response.data);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching company details:', error);
        }

    };

    const handleClickOnCompany = (id) => {
      clickSound.play()
        navigate(`/dashboard/${id}`);
        localStorage.setItem('companyName', JSON.stringify({ companyName: id }));
    };

    const handleOnclickBody = () => {
        setUpdate(false);
        setOnlyUpdate(false);
        loadCompany();
    };

    const handleCreateCOmpany = () => {
        setUpdate(true);
    };

    const handleOnclickOnupdate = (e, id) => {
        e.stopPropagation();
        setId(id);
        setOnlyUpdate(true);
    };

    return (
        <div className=''>
            <div className="bg-blue-300 h-screen relative overflow-hidden px-0 sm:px-20 ">
                {localStorage.getItem('login') && JSON.parse(localStorage.getItem('login')).login ? (
                    <div className="">
                        <div className='w-full flex justify-center overflow-y-auto '>
                        {(update || onlyUpdate) && (
                                <div className="absolute top-0 left-0 w-full sm:h-screen h-full bg-black opacity-50 z-50" onClick={handleOnclickBody}></div>
                            )}
                            {update && (
                                <div className="absolute sm:w-[40rem] w-full h-[40rem] m-6 bg-white border border-black shadow-md rounded-md z-50 p-4">
                                    <div className="flex justify-end">
                                        <button onClick={handleOnclickBody} className="w-6 h-6 mr-2 focus:outline-none hover:scale-110 transform transition-transform">
                                            <img src={crossImage} alt="Close" />
                                        </button>
                                    </div>
                                    <CreateCOmpany setUpdate={setUpdate} myfunction={loadCompany} />
                                </div>
                            )}
                        </div>
                        <div className='w-full flex justify-center mt-8'>
                                {onlyUpdate && (
                                    <div className="absolute bg-white border border-black shadow-md rounded-md p-4 z-50">
                                        <div className="flex justify-end">
                                            <button onClick={handleOnclickBody} className="w-6 h-6 mr-2 focus:outline-none hover:scale-110 transform transition-transform">
                                                <img src={crossImage} alt="Close" />
                                            </button>
                                        </div>
                                        <UpdateCompany setOnlyUpdate={setOnlyUpdate} id={id} myfunction={loadCompany} />
                                    </div>
                                )}
                            </div>
                        <div className=" mx-2 bg-blue-300 m-0">
                            <div className="h-16 w-full flex justify-center items-center text-4xl text-blue-600 font-bold bg-gray-200 border-b-4 border-blue-400 rounded-t-lg  mt-2">
                                Your Companies
                            </div>
                            <div className="col-span-1 flex justify-center items-center m-2">
                                <div onClick={handleCreateCOmpany} className=" h-16 bg-blue-200 flex justify-center text-blue-900 items-center w-40 hover:bg-blue-600 hover:text-white transition-colors duration-300 rounded-lg shadow-md">
                                    <button onClick={handleCreateCOmpany} className=" font-semibold focus:outline-none">
                                        Create Company
                                    </button>
                                </div>
                            </div>
                            {loading?<div className='w-full flex justify-center'><img src={loader} alt="" /></div>:''}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4  sm:h-full overflow-y-auto">
                               
                               {companyDetail.map((company, index) => (
                                    <div
                                        key={company.companyId}
                                        className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition-transform"
                                        onClick={() => handleClickOnCompany(company.companyName)}
                                    >
                                        <p className="text-lg font-extrabold text-blue-600 uppercase tracking-wide mb-4">{company.companyName}</p>
                                        {company.gst && <p className="text-sm mb-2">GST: {company.gst}</p>}
                                        {company.gstType && <p className="text-sm mb-2">GST Type: {company.gstType}</p>}
                                        <p className="text-sm mb-2">Address: {company.companyAddress}</p>
                                        <p className="text-sm mb-2">Mobile No: {company.mobile}</p>
                                        <p className="text-sm mb-2">State: {company.state}</p>
                                        <p className="text-sm mb-2">Email: {company.email}</p>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={(e) => handleOnclickOnupdate(e, company.companyId)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ) : (
                    <Home />
                )}
            </div>

        </div>
    );
}

export default UsersDashboard;
