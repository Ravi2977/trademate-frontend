import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import loder from './loader.gif'
import { BASE_URL } from './AuthContext';
// import { NavLink } from 'react-router-dom'

function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    login: false,
    store: ''
  });

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem('login'));
    if (store && store.login) {
      setLoginDetails(prevState => ({
        ...prevState,
        login: true
      }));
    }
  }, []);
  useEffect(()=>{
const response =axios.get(`${BASE_URL}/auth/hello`)
console.log(response.data)
  },[])

  const loadUser = async () => {
    try {
      const loadedUser = await axios.get(`${BASE_URL}/user/byemail/${JSON.parse(localStorage.getItem('login')).user}`, {

        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).token}`,
        },

      })
      return loadedUser;
    } catch (e) {

    }

  }
  const onEventChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleOnClick = (e) => {
    setLoading(true)
    e.preventDefault();
    fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginDetails)
    }).then((resp) => {
      if (!resp.ok) {
        // If response status is not ok, update error message
        document.getElementById('errorInfo').innerHTML = "! Either email or password is wrong";
        setLoading(false)
      } else {
        resp.json().then((result) => {
          // Process JSON response data
          try {
            localStorage.setItem('login', JSON.stringify({
              login: true,
              token: result.jwtToken,
              user: result.userNAme
            }));
            loadUser().then((resp) => {
              console.log(resp.data)
              console.log(resp.data.verified,resp.data.subscribed)
              if (result.jwtToken) {
                if (resp.data.verified) {
                  navigate('/usersDashboard');
                  window.location.reload();
                }else{
                  navigate('/vercation');
                }
              }
            });
          } catch (jsonError) {
            // Handle JSON parsing errors
            console.error('Error parsing JSON:', jsonError);
            document.getElementById('errorInfo').innerHTML = "! Server Not responding try again later";
            setLoading(false)
          }
        }).catch((jsonError) => {
          // Handle JSON parsing errors
          console.error('Error parsing JSON:', jsonError);
          document.getElementById('errorInfo').innerHTML = "! Passwornd is not correct";
          setLoading(false)
        });
      }
    }).catch((fetchError) => {
      // Handle fetch errors
      console.error('Fetch error:', fetchError);
      document.getElementById('errorInfo').innerHTML = "! Server Not responding try again later";
      setLoading(false)
    });

  };


  return (
    <div className='mt-2 pb-3'>

      <form className="space-y-6 sm:w-full" onSubmit={(e) => handleOnClick(e)}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-blue-900">Email address</label>
          <div className="mt-2 ">
            <input id="email" name="email" value={loginDetails.email} onChange={(e) => onEventChange(e)} type="email" autoComplete="email" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Password</label>
          </div>
          <div className="mt-2">
            <input id="password" value={loginDetails.password} name="password" onChange={(e) => onEventChange(e)} type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <div className="text-sm">
              <a href="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">Forgot password?</a>
            </div>
          </div>
        </div>

        <div>
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? <img className='h-6 rounded-full' src={loder} alt="" /> : "Sign in"}</button>
        </div>
        <div className="text-sm flex justify-end">
          {/* <p className='mx-2'>Don't have an account? </p><a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500 underline underline-offset-4">Sign up</a> */}
        </div>
      </form>
      <div id="errorInfo" className='text-red-600 text-lg w-full text-center '></div>
    </div>

  )
}

export default Signin
