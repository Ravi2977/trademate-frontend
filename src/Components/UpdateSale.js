import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from './AuthContext';

function UpdateSale(props) {
    const date = new Date();
    const navigate = useNavigate()
    const [updateStatus,setUpdateStatus]=useState('')
    const [saleDetail, setSaleDetail] = useState({
        receivedAmmount: 0
    })
    const onEventChange = (e) => {
        setSaleDetail({
            ...saleDetail,
            [e.target.name]: e.target.value
        })

    }
    const { id } = useParams()
    const handleOnSubmit = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/sales/editsale/${props.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            },
            body: JSON.stringify(saleDetail)
        }).then((resp) => {
            if (resp.ok) {
                setUpdateStatus("Received Ammount Updated")
                document.getElementById('updateStatus').classList.remove("text-red-600")
                document.getElementById('updateStatus').classList.add("text-green-600")
                props.setUpdate(false)
                props.myFunction();
            }else{
                setUpdateStatus("Failed to Update Received Ammount")
                
                document.getElementById('updateStatus').classList.remove("text-green-600")
                document.getElementById('updateStatus').classList.add("text-red-600")
            }
        })
    }
    return (
        <div className='w-[20rem] sm:w-[40rem]'>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Update received Ammount</h1></div>
            <div className=''>
                <div className='border border-blue-100 justify-center col-span-2'>
                    <form className="space-y-6 sm:px-40 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                       <div className='flex sm:flex-col flex-row justify-around w-full'>
                       <div className='mr-2'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Received Ammount By:- <span className='text-blue-600'>{props.itemName}</span></label>
                            </div>
                            <div className="mt-2">
                                <input value={saleDetail.receivedAmmount} onChange={(e) => onEventChange(e)} id="amount" name="receivedAmmount" type="number" required className="block w-full rounded-md p-2 border-0 py-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className='mt-10'>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Received money</button>
                        </div>
                       </div>
                    </form>

                </div>
              <div className='text-xl font-bold w-full text-center' id='updateStatus'>{updateStatus}</div>
            </div>
        </div>
    )
}

export default UpdateSale
