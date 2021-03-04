import React, { useState } from 'react'
import { withRouter, useHistory } from "react-router-dom";
import { IoTrashOutline } from 'react-icons/io5';
import DialogueBox from './DialogueBox';
import Notification from './Notification';
import CheckBoxDialogue from './CheckBoxDialogue';

const StoredProductCard = (props) => {
    const history = useHistory();
    const { stored, handleClickDelete, selectOption, addPurchasedStorage, retrieveProduct, notification, setNotification, i } = props

    //get all key values from localStorage and compare with the id of the item;
    let allStorageKeys = Object.keys(localStorage);

    const [isopen, setIsopen] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleClose = () => {
        setIsopen(false)
    }

    const handleCloseCheck = () => {
        setIsChecked(false)
    }

    //======= Navigation functions for Edit========
    const handleEdit = () => {
        if (allStorageKeys.includes(stored.id)) {
            setIsChecked(true)
        } else {
            history.push(`/item/edit/${stored.id}/${stored.item}`);
        }
    }


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

            <div className="btn-del__edt" >
                <button className="btn-delete" style={{ marginRight: '15px', fontSize: '20px', fontWeight: 'bold', color: 'blueviolet' }} onClick={() => (handleEdit())}>
                    <i className="far fa-edit"></i>
                </button>

                <button className="btn-delete" onClick={() => setIsopen(true)}>
                    <IoTrashOutline style={{ color: 'salmon', fontSize: '20px', fontWeight: 'bold', transition: 'all .4s' }} />
                </button>

            </div>

            {
                (!(allStorageKeys.includes(stored.id))) ?
                    <DialogueBox isopen={isopen} handleClose={handleClose}>
                        <div className="confirm-title"> <h4>Do You Want To Remove <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> ?</h4></div>
                        <div className="btn-yes__wrapper">
                            <button className="btn-no" onClick={() => handleClose()}>No</button>
                            <button className="btn-yes" onClick={() => { handleClickDelete(retrieveProduct[i]); handleClose() }}>Yes</button>
                        </div>
                    </DialogueBox>
                    :
                    <DialogueBox isopen={isopen} handleClose={handleClose}>
                        <div className="confirm-title"> <h4>Please uncheck &#9745; <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> before Remove !</h4></div>

                        <button className="btn-no" style={{ width: '100%', marginBottom: '10px' }} onClick={() => handleClose()}>OK</button>
                    </DialogueBox>
            }

            <CheckBoxDialogue isChecked={isChecked} handleCloseCheck={handleCloseCheck}>
                <div className="confirm-title"> <h4>Please uncheck &#9745; <span style={{ color: 'salmon', textTransform: 'uppercase' }}>{stored.item}</span> before Edit !</h4></div>

                <button className="btn-no" style={{ width: '100%', marginBottom: '10px', backgroundColor:'salmon' }} onClick={() => handleCloseCheck()}>OK</button>
            </CheckBoxDialogue>

            { notification ? <Notification notification={notification} setNotification={setNotification} /> : ''}
        </>
    )
}


export default withRouter(StoredProductCard)
