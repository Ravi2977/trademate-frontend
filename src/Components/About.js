import React from 'react'
import one from './one.png'
import two from './two.png'
import three from './trhee.png'
import four from './four.png'

function About() {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Trade<span className='text-red-600'>Mate</span></h1>
                            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                        </div>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">TradeMate helps to manage and track your business smartly you can add sales, purchases, expences and stocks and you will get monthly, annualy report on report page you will get your gast details monthly and quatrly based on your gst type you can track your sales, purchases, expences and much more.</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <img className="h-40 rounded w-full object-cover object-center mb-6" src={one} alt="content" />
                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Dashboard</h3>
                                {/* <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2> */}
                                <p className="leading-relaxed text-base">In TradeMate you will get a dashboard and list of companies you have added. As many as you want you can add companies you can update your company gst and gst types</p>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <img className="h-40 rounded w-full object-cover object-center mb-6" src={two} alt="content" />
                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Company Dashboard</h3>
                                {/* <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Colosseum Roma</h2> */}
                                <p className="leading-relaxed text-base">you will get a company dashboard for each company and at company dashboard you will get notification about new updates and all navigations for your company.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <img className="h-40 rounded w-full object-cover object-center mb-6" src={three} alt="content" />
                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">Entry Details</h3>
                                {/* <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Great Pyramid of Giza</h2> */}
                                <p className="leading-relaxed text-base">At company dashboard you will get navigations to your companny sales detials, purchase details, stocks and stock item details also remaining sales and purchase highlighted details</p>
                            </div>
                        </div>
                        <div className="xl:w-1/4 md:w-1/2 p-4">
                            <div className="bg-gray-100 p-6 rounded-lg">
                                <img className="h-40 rounded w-full object-cover object-center mb-6" src={four} alt="content" />
                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">report profits and remaining</h3>
                                {/* <h2 className="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2> */}
                                <p className="leading-relaxed text-base">At report you will get all your company report profits , revenue and remainings by monthly , annualy and all time report . also you will get  Gst report at Gst page  you will get gst based on your gst type</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
