import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from './AuthContext'

function UpdatePurchase(props) {
    const navigate = useNavigate()
    const [updateStatus,setUpdateStatus]=useState('')
    const [purchaseDetails, setPurchaseDetails] = useState({
        paidAmmount: 0,
        id:props.id
    })
    const onEventChange = (e) => {
        setPurchaseDetails({
            ...purchaseDetails,
            [e.target.name]: e.target.value,
            id:props.id
        })


    }
    console.log(props.id ,"This is id ")
    const { id } = useParams()
    const handleOnSubmit =async (e) => {
        e.preventDefault()
       try{
        await fetch(`${BASE_URL}/purchase/update`,
        
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            },
            body:JSON.stringify(purchaseDetails)
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
       }catch(e){
        setUpdateStatus("Some error occurs");
       }
    }
    return (
        <div>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Update paid Ammount </h1></div>
            <div className=''>
                <div className='border border-blue-100 justify-center col-span-2'>
                    <form className="space-y-6 px-40 py-2 " onSubmit={(e) => handleOnSubmit(e)}>
                        <div className='flex justify-center w-[15rem]'>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Paid to:- <span className='text-blue-600'>{props.itemName}</span></label>
                            </div>
                            <div className="mt-2">
                                <input value={purchaseDetails.paidAmmount} onChange={(e) => onEventChange(e)} id="amount" name="paidAmmount" type="number" required className="block w-full rounded-md p-2 border-0 py-1.5 text-blue-900 shadow-sm ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add paid money</button>
                        </div>
                    </form>

                </div>
              <div className='text-xl font-bold w-full text-center' id='updateStatus'>{updateStatus}</div>
            </div>
        </div>
    )
}

export default UpdatePurchase
