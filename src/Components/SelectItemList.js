import React, { useState } from 'react'

function SelectItemList() {
    const [sale, setSale] = useState();
    const [isOpen, steIsOpen] = useState(false)
    const itemNames = JSON.parse(localStorage.getItem('saleDetails'))
    const handlOnClickItemName = (name) => {
        setSale(name)
        steIsOpen(false)
    }
    return (
        <div>
            <div className="dropdown absolute bg-gray-100" style={{ width: 438 }}>

                <ul>
                    {isOpen && itemNames.map((item, index) => (
                        item.itemName.toLowerCase().includes(sale ? sale.toLowerCase() : '') ? <li key={index} className='list-none border border-x-2  flex justify-center hover:bg-blue-200' onClick={() => handlOnClickItemName(item.itemName)}>
                            {item.itemName}
                        </li> : ''
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SelectItemList
