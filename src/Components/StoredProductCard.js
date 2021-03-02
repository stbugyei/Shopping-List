import React, { useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import DialogueBox from './DialogueBox';

const StoredProductCard = (props) => {

    const { stored, handleClickDelete, selectOption, addPurchasedStorage, retrieveProduct, i } = props

    const [isopen, setIsopen] = useState(false)

    const handleClose = () => {
        setIsopen(false)
    }

    //get all key values from localStorage and compare with the id of the item;
    let allStorageKeys = Object.keys(localStorage);

    return (
        <>
            <div className="value">
                <label htmlFor={stored.id}>
                    <input
                        id={stored.id}
                        name={stored.item}
                        type="checkbox"
                        defaultChecked={localStorage.getItem(`${stored.id}`) === "true" ? 'defaultChecked' : ''}
                        onChange={(e) => selectOption(e, `${stored.id}`)}
                        onClick={(e) => addPurchasedStorage(e, stored)}
                    />
                    <b></b>
                    {stored.item ? <span style={{ marginLeft: "5px" }}>{stored.item}</span> : 'null'}
                </label>
            </div>

            <div className="quantity">
                {stored.quantity ? <span> Qty: {stored.quantity}</span> : 'null'}
            </div>

            <div className="price">
                {stored.price ? <span>€ {stored.price}</span> : 'null'}
            </div>

            <div className="total">
                {stored.total ? <span> {((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(stored.total)))}</span> : 'null'}
            </div>

            <button className="btn-delete" onClick={() => setIsopen(true)}>
                <IoTrashOutline style={{ color: 'salmon', fontSize: '20px', fontWeight: 'bold', transition: 'all .4s' }} />
            </button>


            {(!(allStorageKeys.includes(stored.id))) ?
                <DialogueBox isopen={isopen} handleClose={handleClose}>
                    <div className="confirm-title"> <h4>Do you want to Remove <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> ?</h4></div>
                    <div className="btn-yes__wrapper">
                        <button className="btn-no" onClick={() => handleClose()}>No</button>
                        <button className="btn-yes" onClick={() => handleClickDelete(retrieveProduct[i])}>Yes</button>
                    </div>
                </DialogueBox>
                :
                <DialogueBox isopen={isopen} handleClose={handleClose}>
                    <div className="confirm-title"> <h4>Please uncheck &#9745; <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> before Remove !</h4></div>

                    <button className="btn-no" style={{ width: '100%', marginBottom: '10px' }} onClick={() => handleClose()}>OK</button>
                </DialogueBox>
            }

            {/* <DialogueBox isopen={isopen} handleClose={handleClose}>
                {(allStorageKeys.includes(stored.id)) ?
                    <>
                        <div className="confirm-title"> <h4>Please uncheck <input type="checkbox" defaultChecked /> <span style={{ color: 'red' }}>{stored.item}</span> before Remove !</h4></div>
                    </> :
                    <>
                        <div className="confirm-title"> <h4>Do you want to Remove <span style={{ color: 'red' }}>{stored.item}</span> ?</h4></div>

                        <div className="btn-yes" onClick={() => handleClickDelete(retrieveProduct[i])}>Yes</div>
                    </>
                }
            </DialogueBox> */}
        </>
    )
}


export default StoredProductCard
