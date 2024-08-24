
import React from 'react'
import favicon from './favicon.png'
function Carasoul() {
    return (
        <div>
            <section className="dark:bg-gray-800 dark:text-gray-100">
              <div>
              <div className='w-full flex justify-center pt-10'>
                <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
                    <img src={favicon} alt="" />
                </div>
                </div>
              <div className="container flex flex-col justify-center px-6 lg:flex-row lg:justify-between">
                
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leadi sm:text-4xl">Trade<span className='text-red-600'>Mate</span>
                            <br />
                            <span className="dark:text-violet-400">Business</span> Management Web App
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Track and Manage Your Business smartly
                            <br className="hidden md:inline lg:hidden" /> With your Computer Automatically </p>
                        {/* <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Suspendisse</a>
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100">Malesuada</a>
                        </div> */}
                    </div>
                </div>
              </div>
            </section>
        </div>

    )
}

export default Carasoul
