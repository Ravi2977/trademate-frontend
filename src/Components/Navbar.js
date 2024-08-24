import React, { useEffect, useState } from 'react';
import { NavLink, json, useNavigate } from 'react-router-dom';
import favicon from './favicon.png';
import logout from './logout.png';
import { BASE_URL } from './AuthContext';

function Navbar(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  let store = JSON.parse(localStorage.getItem('login'));
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false)
  useEffect(() => {
    if(localStorage.getItem('login')){
      loadCompany()
    }
  }, [])

  const handleOnClick = () => {
    if (store) {
      localStorage.clear();
      navigate('/');
    } else {
      navigate('/signup');
    }
    window.location.reload();
  };
  const loadCompany = () => {
    try {
        fetch(`${BASE_URL}/user/byemail/${JSON.parse(localStorage.getItem('login')).user}`, {
            method: "GET",
            headers: { // Corrected typo: 'headers' instead of 'header'
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            }
        }).then(resp => {
            // Check if the response is successful
            if (!resp.ok) {
                throw new Error('Failed to fetch user data');
            }
            // Parse JSON response
            return resp.json();
        }).then(result => {
            // Handle the parsed response data
            setIsVerified(result.verified);
        }).catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    } catch (e) {
        // Handle any errors that occurred outside of the fetch operation
        console.error('Error:', e);
    }
}
  return (
    <div className="bg-blue-200">
      <nav className="bg-white-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="sm:hidden mr-3">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Menu
                </button>
              </div>
              <div className="flex flex-shrink-0 items-center">
                <span className="flex flex-row">
                  <img className="h-8 w-auto" src={favicon} alt="Trade Mate" />
                  <span className="mx-2 my-auto font-semibold">
                    <span>Trade</span>
                    <span className="text-red-600">Mate</span>
                  </span>
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="flex space-x-4">
                  <NavLink
                    to={(store && isVerified) ? '/usersDashboard' : '/'}
                    className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    {localStorage.getItem('login') ? 'Dashboard' : 'Home'}
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Contact
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/licence"
                    className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Pricing
                  </NavLink>
                </div>
              </div>

            </div>

            <div className="relative ml-3">
              <div className='flex'>
                <button
                  type="button"
                  onClick={handleOnClick}
                  className="relative bg-blue-300 py-2 px-4 flex border hover:border-blue-300 hover:text-white rounded-xl hover:bg-blue-400 transition-all"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  {store ? store.user.slice(0, 7) + "..." : 'Sign-Up'}{' '}
                  {localStorage.getItem('login') ? (
                    JSON.parse(localStorage.getItem('login')).login ? (
                      <img className="w-7 ml-2 h-7" src={logout} alt="" />
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </button>
               {store?'': <NavLink to="/signin" className='relative bg-blue-300 py-2 px-4 flex border hover:border-blue-300 hover:text-white rounded-xl hover:bg-blue-400 transition-all'>Sign in</NavLink>}
              </div>
            </div>
          </div>
          {showDropdown && (
            <div className="sm:hidden">
              <div className="flex flex-col space-y-4">
                <NavLink
                  to={store ? '/usersDashboard' : '/'}
                  onClick={() => setShowDropdown(false)}
                  className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  {localStorage.getItem('login') ? 'Dashboard' : 'Home'}
                </NavLink>
                <NavLink
                  to="/contact"
                  onClick={() => setShowDropdown(false)}
                  className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setShowDropdown(false)}
                  className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  About
                </NavLink>
                <NavLink
                  to="/licence"
                  onClick={() => setShowDropdown(false)}
                  className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Pricing
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
