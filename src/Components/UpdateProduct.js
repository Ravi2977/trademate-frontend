import React, { useState } from 'react'
import LeftSidbar from './LeftSidbar'
import RightSidebar from './RightSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from './AuthContext'

function UpdateProduct(props) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [status,setStatus]=useState('')
    const [newPrice, setNewPrice] = useState({
        purchasePrice: 0,
        itemName: ''
    })
    const onEventChange = (e) => {
        setNewPrice({
            ...newPrice,
            [e.target.name]: e.target.value,
            itemName: props.itemName
        })

    }

    // console.log(id)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        fetch(`${BASE_URL}/stock/updateStock`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('login') ? JSON.parse(localStorage.getItem('login')).token : ""}`
            },
            body: JSON.stringify(newPrice)
        }).then((resp) => {
            if (resp.ok) {
                // navigate("/stocks")
                // props.setUpdate(false)
                setStatus("Price Updated")
                let updatesection =document.getElementById('update')
                props.setUpdate(false)
                updatesection.classList.remove('text-red-500')
                updatesection.classList.add('text-green-500')
                props.myFunction();
            }else{
                setStatus("Something went wrong")
                let updatesection =document.getElementById('update')
                updatesection.classList.remove('text-green-500')
                updatesection.classList.add('text-red-500')
            }

        })
    }
    return (
        <div className='p-4'  style={{ width: 700}}>
            <div><h1 className='flex justify-center text-3xl font-bold  text-green-600'>Add New Purchase Price </h1></div>
            <div className=''>

                <div className=' justify-center col-span-2'>
                    <form className="space-y-6 px-40 py-2" onSubmit={(e) => handleOnSubmit(e)}>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-blue-900">Enter New Purchase Price  of :-<span className='text-blue-600'> {props.itemName}</span> </label>
                            </div>
                            <div className="mt-2">
                                <input  value={newPrice.purchasePrice} onChange={(e) => onEventChange(e)} id="amount" name="purchasePrice" type="number" min="1" required className="block w-full rounded-md p-2 border-0 py-1.5 text-blue-900  ring-1 ring-inset ring-blue-300 placeholder:text-blue-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add New Price</button>
                        </div>
                    </form>

                </div>

            </div>
            <div className="updatestatus text-2xl font-semibold text-center w-full" id="update">{status}</div>
        </div>
    )
}

export default UpdateProduct
