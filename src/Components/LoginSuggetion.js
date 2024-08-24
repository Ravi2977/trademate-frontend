import React from 'react'
import { NavLink } from 'react-router-dom'

function LoginSuggetion() {
  return (
    <div>
      <div style={{height:435}} className='w-screen text-center '>
            <div  className='w-screen text-center font-bold text-red-600 align-middle mt-40 mb-10 text-3xl'>Please log in first</div>
            <NavLink className=" border border-red-600 px-4 py-2 hover:bg-red-600 hover:text-white rounded-lg" to="/">Log-in</NavLink>
            </div>
    </div>
  )
}

export default LoginSuggetion
