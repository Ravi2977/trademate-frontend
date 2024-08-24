import React from 'react'
import Signin from './Signin'
import Carasoul from './Carasoul'


function Home() {
    return (
        <div className="container flex justify-center my-14 flex-col sm:h-full h-[38rem]">
            <div className='text-3xl flex justify-center '>
                Welcome to <span className='text-semibold'>&ensp;Trade</span><span className='text-red-400 font-bold'>Mate</span>
            </div>
            <div className='grid sm:grid-cols-2 grid-cols-1  ml-10'>
                <div className="col1 justify-between flex-wrap mt-8 hidden sm:flex">
                    <Carasoul/>
                </div>
                <div className="col2 pr-20 pt-15">
                    <div className="signintag flex flex-col text-3xl justify-center pl-1 sm:pl-32 py-10 ">Sign in to your Account</div>
                   <Signin/>
                </div>
            </div>
        </div>
    )
}

export default Home
