import React from 'react';
import h1 from './h1.png'
import h2 from './h2.png'

function LandingPage() {
  return (
    <div className="font-sans bg-blue-500">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Trade<span className='text-red-600'>Mate</span></h1>
        <p>Simplifying Business Management</p>
      </header>
      <section className="hero bg-cover bg-center flex justify-center py-2 ">
      <img className='rounded-2xl shadow-lg' src={h1} alt="" />
      </section>

      <section className="p-4 grid sm:grid-cols-2 grid-cols-1">
      <div className=''>
          <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-4">Introducing Trademate: Your Business Companion</h1>
            <p className="text-gray-600 mb-6">Simplify your business tasks and take control with Trademate.</p>

            <h2 className="text-xl font-semibold mb-2">Key Features:</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className='list-none'>📈 Sales Tracking: Monitor sales transactions and customer details.</li>
              <li className='list-none'>📦 Purchase Management: Organize purchases and track inventory.</li>
              <li className='list-none'>💸 Expense Tracking: Categorize and manage expenses.</li>
              <li className='list-none'>📊 Monthly Reports: Get insights into business performance.</li>
              <li className='list-none'>📋 GST Reports: Simplify tax compliance.</li>
              <li className='list-none'>📦 Stock Management: Optimize inventory levels.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">Why Choose Trademate?</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className='list-none'>🚀 User-Friendly: Clean and simple interface.</li>
              <li className='list-none'>⏱️ Efficient Workflow: Quick data entry and automation.</li>
              <li className='list-none'>🔒 Secure: Encrypted data protection.</li>
              <li className='list-none'>💰 Affordable: Competitive pricing plans.</li>
            </ul>

            <p className="text-gray-600">Visit <a href="https://www.trademate.com" className="text-blue-500 hover:underline">Trademate</a> and take your business to new heights!</p>
          </div>
        </div>
        <div className='max-w-3xl mx-auto p-6 rounded-lg shadow-md ml-1  bg-blue-400'>
  <h2 className="text-center text-xl font-bold mb-4 "><span className='border border-white  p-2 rounded-lg bg-white shadow-md font-bol text-blue-600'>Our Services</span></h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
    {/* Track Sales and Purchases */}
    <div className="bg-blue-100 rounded-lg shadow-md p-6 hover:bg-blue-200 transition duration-300">
      <h3 className="font-bold text-lg mb-2 text-blue-800">Track Sales and Purchases</h3>
      <p className="text-blue-700">Efficiently track your sales and purchases with our intuitive tracking system.</p>
    </div>
    {/* Manage Business Expenses */}
    <div className="bg-green-100 rounded-lg shadow-md p-6 hover:bg-green-200 transition duration-300">
      <h3 className="font-bold text-lg mb-2 text-green-800">Manage Business Expenses</h3>
      <p className="text-green-700">Streamline your expense management process and stay on top of your finances.</p>
    </div>
    {/* Calculate Profits and Losses */}
    <div className="bg-yellow-100 rounded-lg shadow-md p-6 hover:bg-yellow-200 transition duration-300">
      <h3 className="font-bold text-lg mb-2 text-yellow-800">Calculate Profits and Losses</h3>
      <p className="text-yellow-700">Get insights into your business performance by calculating profits and losses effortlessly.</p>
    </div>
    {/* Automate GST Calculations */}
    <div className="bg-purple-100 rounded-lg shadow-md p-6 hover:bg-purple-200 transition duration-300">
      <h3 className="font-bold text-lg mb-2 text-purple-800">Automate GST Calculations</h3>
      <p className="text-purple-700">Automate your GST calculations to ensure compliance and accurate reporting.</p>
    </div>
    {/* Expense Daily Report */}
    <div className="bg-red-100 rounded-lg shadow-md p-6 hover:bg-red-200 transition duration-300">
      <h3 className="font-bold text-lg mb-2 text-red-800">Expense Daily Report</h3>
      <p className="text-red-700">Receive daily reports of your business expenses to track your spending efficiently.</p>
    </div>
    <div className="bg-blue-100 rounded-lg shadow-md p-6 hover:bg-blue-200 transition duration-300">
      <h3 className="font-bold text-lg mb-2 text-blue-800">Get your Daily report</h3>
      <p className="text-blue-700">Get your daily report pf your business and analyze the profit loss, sale and purchase </p>
    </div>
  </div>
</div>

        
      </section>
      <section className="bg-blue-100 py-4">
        <div className="container mx-auto px-4 flex justify-center flex-col">
          <h2 className="text-center text-xl font-bold mb-4">Get Started Today!</h2>
          <p className="text-center mb-4">Sign up now and take control of your business.</p>
          <div className='w-full flex justify-center'><a href="signup" className="btn bg-blue-500 text-white py-2 px-4 rounded ml-2  w-24">Sign Up</a></div>
        </div>
      </section>
<div>

</div>
    </div>
  );
}

export default LandingPage;
